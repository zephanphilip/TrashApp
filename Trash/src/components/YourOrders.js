import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Animated
} from 'react-native';
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { General } from "../constants";

const YourOrders = () => {
  const { user, isLoaded } = useUser();
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const fetchOrders = async () => {
    if (!isLoaded || !user) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${General.API_BASE_URL}api/orders/pending/${user.id}`);
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch orders:', errorData);
        Alert.alert('Error', errorData.message || 'Failed to fetch your orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Something went wrong while fetching your orders');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user, isLoaded]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderOrderItems = (items) => {
    return items.map((item, index) => (
      <View key={index} style={styles.orderItem}>
        <View style={styles.orderItemHeader}>
          <Text style={styles.orderItemType}>{item.type}</Text>
          <Text style={styles.orderItemCategory}>{item.category}</Text>
        </View>
        <View style={styles.orderItemDetails}>
          <Text style={styles.orderItemQuantity}>Quantity: {item.quantity}</Text>
          <Text style={styles.orderItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    ));
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#a5bc64" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Please login to view your orders</Text>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#a5bc64"]}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Your Pending Orders</Text>
        <Text style={styles.subtitle}>
          {orders.length > 0 
            ? `You have ${orders.length} pending order${orders.length > 1 ? 's' : ''}`
            : 'No pending orders'
          }
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#a5bc64" />
        </View>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <View key={order._id} style={styles.orderCard}>
            <TouchableOpacity 
              style={styles.orderHeader}
              onPress={() => toggleOrderExpansion(order._id)}
              activeOpacity={0.7}
            >
              <View>
                <Text style={styles.orderDate}>
                  {formatDate(order.createdAt)}
                </Text>
                <Text style={styles.orderId}>
                  Order #{order._id.substring(0, 8)}
                </Text>
              </View>
              <View style={styles.headerRight}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
                <Text style={styles.expandIndicator}>
                  {expandedOrderId === order._id ? '▲' : '▼'}
                </Text>
              </View>
            </TouchableOpacity>
            
            {expandedOrderId === order._id && (
              <View style={styles.expandableContent}>
                <View style={styles.pickupInfo}>
                  <View style={styles.pickupDetail}>
                    <Text style={styles.pickupLabel}>Pickup Location:</Text>
                    <Text style={styles.pickupValue}>{order.pickupLocation}</Text>
                  </View>
                  <View style={styles.pickupDetail}>
                    <Text style={styles.pickupLabel}>Scheduled Pickup:</Text>
                    <Text style={styles.pickupValue}>{order.pickupSlot}</Text>
                  </View>
                </View>
                
                <View style={styles.itemsContainer}>
                  <Text style={styles.itemsTitle}>Items:</Text>
                  {renderOrderItems(order.items)}
                </View>
                
                <View style={styles.orderFooter}>
                  <Text style={styles.totalAmount}>
                    Total: ${order.totalAmount.toFixed(2)}
                  </Text>
                  <TouchableOpacity 
                    style={styles.trackButton}
                    onPress={() => navigation.navigate('OrderDetails', { orderId: order._id })}
                  >
                    <Text style={styles.trackButtonText}>Track Order</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You don't have any pending orders yet</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.navigate('WasteSelection')}
          >
            <Text style={styles.shopButtonText}>Start Recycling</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default YourOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3ee",
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  header: {
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5d6839",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#606c3b",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#5d6839",
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: "#a5bc64",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandIndicator: {
    marginLeft: 8,
    fontSize: 16,
    color: "#5d6839",
  },
  expandableContent: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#dee2cb",
    paddingTop: 10,
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5d6839",
    marginTop: 3,
  },
  statusBadge: {
    backgroundColor: "#f9f3cc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: "#5d6839",
    fontWeight: "bold",
    fontSize: 12,
    textTransform: 'uppercase',
  },
  pickupInfo: {
    backgroundColor: "#f0f3e0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  pickupDetail: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  pickupLabel: {
    fontWeight: "bold",
    color: "#5d6839",
    width: 130,
  },
  pickupValue: {
    flex: 1,
    color: "#606c3b",
  },
  itemsContainer: {
    marginBottom: 15,
  },
  itemsTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#5d6839",
    marginBottom: 8,
  },
  orderItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  orderItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderItemType: {
    fontWeight: "bold",
    color: "#5d6839",
  },
  orderItemCategory: {
    color: "#a5bc64",
    fontSize: 12,
    backgroundColor: "#f0f3e0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  orderItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderItemQuantity: {
    color: "#666",
  },
  orderItemPrice: {
    fontWeight: "bold",
    color: "#5d6839",
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: "#dee2cb",
    paddingTop: 15,
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#5d6839",
  },
  trackButton: {
    backgroundColor: "#a5bc64",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  trackButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: 'center',
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: "#a5bc64",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  shopButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});