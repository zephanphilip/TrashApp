import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { General } from "../constants";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

const wasteCategories = {
  "E-Waste": [
    { type: "Computers", price: 50 },
    { type: "Smartphones", price: 20 },
    { type: "Tablets", price: 30 },
    { type: "Printers", price: 40 },
    { type: "Batteries", price: 5 },
  ],
  Plastic: [
    { type: "Plastic Bottles", price: 0.1 },
    { type: "Recyclable Plastics", price: 0.2 },
    { type: "Plastic Containers", price: 0.3 },
    { type: "Plastic Packaging", price: 0.15 },
  ],
  "Metal Scrap": [
    { type: "Aluminum Cans", price: 0.5 },
    { type: "Steel Scraps", price: 2 },
    { type: "Copper Wires", price: 5 },
    { type: "Iron Pieces", price: 1 },
  ],
  Organic: [
    { type: "Food Waste", price: 0.05 },
    { type: "Garden Waste", price: 0.1 },
    { type: "Compostable Materials", price: 0.15 },
  ],
  Paper: [
    { type: "Newspapers", price: 0.2 },
    { type: "Cardboard", price: 0.3 },
    { type: "Office Paper", price: 0.25 },
    { type: "Magazines", price: 0.22 },
  ],
};

export default function WasteSelection() {
  const navigation = useNavigation();
  const { user, isLoaded } = useUser();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);

  const handleCheckout = async () => {
    if (isLoaded && user) {
      try {
        // Get user ID from AsyncStorage
        const userId = user?.id;

        if (!userId) {
          Alert.alert("Error", "Please login to continue");
          return;
        }

           // Ensure the cart items are properly formatted
    const orderData = {
      userId: userId,
      items: cart.map(item => ({
        id: item.id,
        category: item.category,
        type: item.type,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: parseFloat(calculateTotalPrice()),
      status: 'pending'
    };
        console.log(orderData);
        // Navigate to Checkout page with order data as parameter
        navigation.navigate('Checkout', { orderData });
      } catch (error) {
        console.error('Checkout error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedType("");
  };

  const addToCart = () => {
    if (selectedCategory && selectedType && quantity > 0) {
      const selectedTypeObj = wasteCategories[selectedCategory].find(
        (item) => item.type === selectedType
      );

      const cartItem = {
        id: Date.now(), // Unique identifier
        category: selectedCategory,
        type: selectedType,
        quantity: quantity,
        price: selectedTypeObj.price,
      };

      setCart([...cart, cartItem]);
      // Reset selections after adding to cart
      setSelectedCategory("");
      setSelectedType("");
      setQuantity(0);
    }
  };

  const deleteCartItem = (id) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to remove this item from the cart?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setCart(cart.filter((item) => item.id !== id));
          },
          style: "destructive",
        },
      ]
    );
  };

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sell it!</Text>

      {/* Category Selection */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Select Waste Category</Text>
        <View style={styles.categoryContainer}>
          {Object.keys(wasteCategories).map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategory,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Type Selection */}
      {selectedCategory && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Select Waste Type</Text>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue) => setSelectedType(itemValue || "")}
          >
            <Picker.Item label="Select Type" value="" />
            {wasteCategories[selectedCategory].map((item) => (
              <Picker.Item
                key={item.type}
                label={`${item.type} ($${item.price}/unit)`}
                value={item.type}
              />
            ))}
          </Picker>
        </View>
      )}

      {/* Quantity Input */}
      {selectedType && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(0, quantity - 1))}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Add to Cart Button */}
      {selectedType && quantity > 0 && (
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}

      {/* Cart Display */}
      {cart.length > 0 && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cart</Text>
          {cart.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View>
                <Text style={styles.cartItemText}>
                  {item.category} - {item.type}
                </Text>
                <Text style={styles.cartItemText}>
                  Quantity: {item.quantity} ($
                  {(item.price * item.quantity).toFixed(2)})
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => deleteCartItem(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.totalContainer}
            onPress={handleCheckout}
            
          >
            <Text style={styles.totalText}>
              Total Price: ${calculateTotalPrice()}
              {"\n"}Proceed To Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f3ee",
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
   
    color: "#5d6839",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryButton: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "48%",
    backgroundColor: "#dee2cb",
  },
  selectedCategory: {
    backgroundColor: "#5d6839",
    color: "white",
  },
  categoryText: {
    color: "#5d6839",
    textAlign: "center",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButton: {
    backgroundColor: "#dee2cb",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    color: "#5d6839",
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#dee2cb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addToCartButtonText: {
    color: "#5d6839",
    fontWeight: "bold",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  cartItemText: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  totalContainer: {
    backgroundColor: "#606c3b",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  totalText: {
    color: "#fdf9e1",
    fontWeight: "bold",
    textAlign: "center",
  },
});
