
 
// import React, { useState, useMemo } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, SafeAreaView, StatusBar } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const extractYouTubeId = (url) => {
//   const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// export default function EducationalContent() {
//   const [videos, setVideos] = useState([
//     {
//               id: '1',
//               url: 'https://www.youtube.com/watch?v=8facy0nK8Lw',
//               title: 'The Plastic Age',
//               thumbnail: `https://img.youtube.com/vi/8facy0nK8Lw/mqdefault.jpg`
//             },
//             {
//               id: '2',
//               url: 'https://youtu.be/W5bh1JFo43U?si=b30y8vKRE87FeAvi',
//               title: 'There is NO Planet B!',
//               thumbnail: `https://img.youtube.com/vi/W5bh1JFo43U/mqdefault.jpg`
//             },
//             {
//                 id: '3',
//                 url: 'https://youtu.be/JaSe85Mcwp0?si=3tBx8uM2CbiPmZTJ',
//                 title: 'Man and Pollution',
//                 thumbnail: `https://img.youtube.com/vi/JaSe85Mcwp0/mqdefault.jpg`
//             },
//             {
//                 id: '4',
//                 url: 'https://youtu.be/uUmtJIBibMM?si=EHgNT7xrdICS79JL',
//                 title: 'Why Trash?',
//                 thumbnail: `https://img.youtube.com/vi/uUmtJIBibMM/mqdefault.jpg`
//             },  
//             {
//                 id: '5',
//                 url: 'https://youtu.be/HgEo7YnvJs0?si=xMuloc37RrRNl5Md',
//                 title: 'How To Manage?',
//                 thumbnail: `https://img.youtube.com/vi/HgEo7YnvJs0/mqdefault.jpg`
//             },
//             {
//                 id: '6',
//                 url: 'https://youtu.be/zx04Kl8y4dE?si=-myQcdz3OItmY3l6',
//                 title: 'What is Sustainability?',
//                 thumbnail: `https://img.youtube.com/vi/zx04Kl8y4dE/mqdefault.jpg`
//             },
//             {
//                 id: '7',
//                 url: 'https://youtu.be/iY77zvY6Is4?si=cPJ20yv2AwQ4ZDTh',
//                 title: 'Global Goals',
//                 thumbnail: `https://img.youtube.com/vi/iY77zvY6Is4/mqdefault.jpg`
//             },
//             {
//                 id: '8',
//                 url: 'https://youtu.be/x_sJzVe9P_8?si=DwFe30PIjseHuNj0',
//                 title: 'Green House Effect',
//                 thumbnail: `https://img.youtube.com/vi/x_sJzVe9P_8/mqdefault.jpg`
//             },
//             {
//                 id: '9',
//                 url: 'https://youtu.be/PqxMzKLYrZ4?si=oNYzTAvCyMdUPERO',
//                 title: 'Global Warming',
//                 thumbnail: `https://img.youtube.com/vi/PqxMzKLYrZ4/mqdefault.jpg`
//             },
//             {
//                 id: '10',
//                 url: 'https://youtu.be/tykLKCT7DyY?si=9j0_4uZm0pxZb-9l',
//                 title: 'Climate Change',
//                 thumbnail: `https://img.youtube.com/vi/tykLKCT7DyY/mqdefault.jpg`
//             },
//             {
//                 id: '11',
//                 url: 'https://youtu.be/dWRGP9CdvUs?si=S38fScRVGxBWlTbp',
//                 title: 'Carbon Monster',
//                 thumbnail: `https://img.youtube.com/vi/dWRGP9CdvUs/mqdefault.jpg`
//             },
//             {
//               id: '12',
//               url: 'https://youtu.be/gf3cTGmvN7s?si=ef87-D9D_HupCJj0',
//               title: 'The Waste Industry',
//               thumbnail: `https://img.youtube.com/vi/gf3cTGmvN7s/mqdefault.jpg`
//             },
//             {
//               id: '13',
//               url: 'https://youtu.be/tZEM5K72aVs?si=pdinP6u9eVu6KWHu',
//               title: 'Solution For Waste In India',
//               thumbnail: `https://img.youtube.com/vi/tZEM5K72aVs/mqdefault.jpg`
//             },
//             {
//               id: '14',
//               url: 'https://youtu.be/94Qqzbz7hZE?si=i0TE5tyPN31RgDZp',
//               title: 'Waste To Power',
//               thumbnail: `https://img.youtube.com/vi/94Qqzbz7hZE/mqdefault.jpg`
//             },
//             {
//               id: '15',
//               url: 'https://youtu.be/1STaZYZ-P1w?si=tHSi5pykbWuUNNgZ',
//               title: 'Plastic To Power',
//               thumbnail: `https://img.youtube.com/vi/1STaZYZ-P1w/mqdefault.jpg`
//             },
//             {
//               id: '16',
//               url: 'https://youtu.be/9GMbRG9CZJw?si=RhLF_ype5eDZBd03',
//               title: 'What is Plastic?',
//               thumbnail: `https://img.youtube.com/vi/9GMbRG9CZJw/mqdefault.jpg`
//             },
//             {
//               id: '17',
//               url: 'https://youtu.be/RIT3UyoDE9Q?si=-oCaxHVYktTqMjG7',
//               title: 'How Plastics Are Converted?',
//               thumbnail: `https://img.youtube.com/vi/RIT3UyoDE9Q/mqdefault.jpg`
//             },
//             {
//               id: '18',
//               url: 'https://youtu.be/YTcjXtNyWVA?si=Zmm508aun95Uj52Q',
//               title: 'What Is E-Waste?',
//               thumbnail: `https://img.youtube.com/vi/YTcjXtNyWVA/mqdefault.jpg`
//             },
//             {
//               id: '19',
//               url: 'https://youtu.be/CmP67zq5hfo?si=dOMUgujSE8NIo_Nf',
//               title: 'Indian E-Waste Management',
//               thumbnail: `https://img.youtube.com/vi/CmP67zq5hfo/mqdefault.jpg`
//             },
//             {
//               id: '20',
//               url: 'https://youtu.be/FmJFVmtWf-I?si=okwQlW6FVrdDKFbD',
//               title: 'The Problem With E-Waste',
//               thumbnail: `https://img.youtube.com/vi/FmJFVmtWf-I/mqdefault.jpg`
//             },
//             {
//               id: '21',
//               url: 'https://youtu.be/3s_ZNEFPiE0?si=AGmCbYc8ngySIuYP',
//               title: 'recycling of E-Waste',
//               thumbnail: `https://img.youtube.com/vi/3s_ZNEFPiE0/mqdefault.jpg`
//             },
//             {
//               id: '22',
//               url: 'https://youtu.be/Lg9ZWAtIT1o?si=o3ycML-7IrNCrucO',
//               title: 'India and E-Waste',
//               thumbnail: `https://img.youtube.com/vi/Lg9ZWAtIT1o/mqdefault.jpg`
//             },
//             {
//               id: '23',
//               url: 'https://youtu.be/KVTxV_9ZZUg?si=4rTslFycGXyzl_IQ',
//               title: 'The Invicible Killer',
//               thumbnail: `https://img.youtube.com/vi/KVTxV_9ZZUg/mqdefault.jpg`
//             },
//             {
//               id: '24',
//               url: 'https://youtu.be/jAa58N4Jlos?si=DvHpkrAxklQ1jzkR',
//               title: 'How Climate Change',
//               thumbnail: `https://img.youtube.com/vi/jAa58N4Jlos/mqdefault.jpg`
//             },
//             {
//               id: '25',
//               url: 'https://youtu.be/eRLJscAlk1M?si=S7VDLRBqPTqt6dMe',
//               title: 'Dear Future Generations',
//               thumbnail: `https://img.youtube.com/vi/eRLJscAlk1M/mqdefault.jpg`
//             },
//             {
//               id: '26',
//               url: 'https://youtu.be/VrzbRZn5Ed4?si=GfU8CouE4MUamQgq',
//               title: 'Man vs Earth',
//               thumbnail: `https://img.youtube.com/vi/VrzbRZn5Ed4/mqdefault.jpg`
//             },
//             {
//               id: '27',
//               url: 'https://youtu.be/pTrJgifaVxs?si=rf8OiMF1bfoR5Ib_',
//               title: 'Not Too Late',
//               thumbnail: `https://img.youtube.com/vi/pTrJgifaVxs/mqdefault.jpg`
//             },
//             {
//               id: '28',
//               url: 'https://youtu.be/lU9grZFexes?si=8rqB7TtmiopgRxcE',
//               title: 'Environment Awareness',
//               thumbnail: `https://img.youtube.com/vi/lU9grZFexes/mqdefault.jpg`
//             },
//             {
//               id: '29',
//               url: 'https://youtu.be/-yUoerVaWMU?si=8_RAtIv-JGE4kfHa',
//               title: 'Our Planet Earth',
//               thumbnail: `https://img.youtube.com/vi/-yUoerVaWMU/mqdefault.jpg`
//             },
//             {
//               id: '30',
//               url: 'https://youtu.be/F_gYWVkp_pU?si=g4dI2ugSrtBouqoT',
//               title: 'A Prayer For Earth',
//               thumbnail: `https://img.youtube.com/vi/F_gYWVkp_pU/mqdefault.jpg`
//             },
               
//   ]);

//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredVideos = useMemo(() => {
//     if (!searchQuery) return videos;
//     return videos.filter(video =>
//       video.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [videos, searchQuery]);

//   const renderVideoItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.videoItem}
//       onPress={() => setSelectedVideo(item)}
//       activeOpacity={0.8}
//     >
//       <LinearGradient
//         colors={['#a8e063', '#56ab2f']}
//         style={styles.gradientCard}
//       >
//         <Image
//           source={{ uri: item.thumbnail }}
//           style={styles.thumbnail}
//           resizeMode="cover"
//         />
//         <View style={styles.videoTextContainer}>
//           <Text style={styles.videoTitle}>{item.title}</Text>
//         </View>
//       </LinearGradient>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#56ab2f" />
//       <LinearGradient
//         colors={['#56ab2f', '#a8e063']}
//         style={styles.headerContainer}
//       >
//         <Text style={styles.header}>SAVE THE PLANET!</Text>
//       </LinearGradient>

//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search videos..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           clearButtonMode="while-editing"
//         />
//       </View>

//       {selectedVideo && (
//         <View style={styles.videoContainer}>
//           <WebView
//             source={{
//               uri: `https://www.youtube.com/embed/${extractYouTubeId(selectedVideo.url)}?modestbranding=1&rel=0&autoplay=1&playsinline=1`
//             }}
//             style={styles.video}
//             javaScriptEnabled={true}
//             domStorageEnabled={true}
//             allowsFullscreenVideo={true}
//             startInLoadingState={true}
//           />
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => setSelectedVideo(null)}
//           >
//             <Ionicons name="close" size={24} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       )}

//       {filteredVideos.length === 0 ? (
//         <View style={styles.noResultsContainer}>
//           <Text style={styles.noResultsText}>No videos found</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={filteredVideos}
//           renderItem={renderVideoItem}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={styles.listContainer}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f7f7',
//   },
//   headerContainer: {
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f0f4f8',
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     margin: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 50,
//     fontSize: 16,
//     color: '#333',
//   },
//   listContainer: {
//     paddingHorizontal: 15,
//     paddingTop: 10,
//   },
//   videoItem: {
//     marginBottom: 15,
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   gradientCard: {
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   thumbnail: {
//     width: '100%',
//     height: 200,
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//   },
//   videoTextContainer: {
//     padding: 15,
//     backgroundColor: 'rgba(255,255,255,0.8)',
//   },
//   videoTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//   },
//   videoContainer: {
//     width: '100%',
//     aspectRatio: 16 / 9,
//     backgroundColor: 'black',
//     marginBottom: 15,
//   },
//   video: {
//     width: '100%',
//     height: '100%',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     padding: 10,
//     borderRadius: 50,
//   },
//   noResultsContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noResultsText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#888',
//   },
// });
import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  SafeAreaView, 
  StatusBar,
  Dimensions,
  ImageBackground,
  Platform
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

const extractYouTubeId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Categories for videos
const categories = [
  "All",
  "Climate",
  "Waste Management",
  "Recycling",
  "Sustainability",
  "E-Waste"
];

// Function to assign categories based on video title keywords
const assignCategory = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('climate') || lowerTitle.includes('global warming') || lowerTitle.includes('earth')) {
    return "Climate";
  } else if (lowerTitle.includes('waste') && lowerTitle.includes('e-waste')) {
    return "E-Waste";
  } else if (lowerTitle.includes('waste') || lowerTitle.includes('trash')) {
    return "Waste Management";
  } else if (lowerTitle.includes('plastic') || lowerTitle.includes('recycl')) {
    return "Recycling";
  } else if (lowerTitle.includes('sustain')) {
    return "Sustainability";
  }
  return "Other";
};

export default function EducationalContent() {
  const [videos, setVideos] = useState([
    {
      id: '1',
      url: 'https://www.youtube.com/watch?v=8facy0nK8Lw',
      title: 'The Plastic Age',
      thumbnail: `https://img.youtube.com/vi/8facy0nK8Lw/mqdefault.jpg`,
      category: "Recycling"
    },
    {
      id: '2',
      url: 'https://youtu.be/W5bh1JFo43U?si=b30y8vKRE87FeAvi',
      title: 'There is NO Planet B!',
      thumbnail: `https://img.youtube.com/vi/W5bh1JFo43U/mqdefault.jpg`,
      category: "Climate"
    },
    {
      id: '3',
      url: 'https://youtu.be/JaSe85Mcwp0?si=3tBx8uM2CbiPmZTJ',
      title: 'Man and Pollution',
      thumbnail: `https://img.youtube.com/vi/JaSe85Mcwp0/mqdefault.jpg`,
      category: "Climate"
    },
    {
      id: '4',
      url: 'https://youtu.be/uUmtJIBibMM?si=EHgNT7xrdICS79JL',
      title: 'Why Trash?',
      thumbnail: `https://img.youtube.com/vi/uUmtJIBibMM/mqdefault.jpg`,
      category: "Waste Management"
    },  
    {
      id: '5',
      url: 'https://youtu.be/HgEo7YnvJs0?si=xMuloc37RrRNl5Md',
      title: 'How To Manage?',
      thumbnail: `https://img.youtube.com/vi/HgEo7YnvJs0/mqdefault.jpg`,
      category: "Waste Management"
    },
    {
      id: '6',
      url: 'https://youtu.be/zx04Kl8y4dE?si=-myQcdz3OItmY3l6',
      title: 'What is Sustainability?',
      thumbnail: `https://img.youtube.com/vi/zx04Kl8y4dE/mqdefault.jpg`,
      category: "Sustainability"
    },
    {
      id: '7',
      url: 'https://youtu.be/iY77zvY6Is4?si=cPJ20yv2AwQ4ZDTh',
      title: 'Global Goals',
      thumbnail: `https://img.youtube.com/vi/iY77zvY6Is4/mqdefault.jpg`,
      category: "Sustainability"
    },
    {
      id: '8',
      url: 'https://youtu.be/x_sJzVe9P_8?si=DwFe30PIjseHuNj0',
      title: 'Green House Effect',
      thumbnail: `https://img.youtube.com/vi/x_sJzVe9P_8/mqdefault.jpg`,
      category: "Climate"
    },
    {
      id: '9',
      url: 'https://youtu.be/PqxMzKLYrZ4?si=oNYzTAvCyMdUPERO',
      title: 'Global Warming',
      thumbnail: `https://img.youtube.com/vi/PqxMzKLYrZ4/mqdefault.jpg`,
      category: "Climate"
    },
    {
      id: '10',
      url: 'https://youtu.be/tykLKCT7DyY?si=9j0_4uZm0pxZb-9l',
      title: 'Climate Change',
      thumbnail: `https://img.youtube.com/vi/tykLKCT7DyY/mqdefault.jpg`,
      category: "Climate"
    },
    // Remaining videos with categories assigned
    {
      id: '11',
      url: 'https://youtu.be/dWRGP9CdvUs?si=S38fScRVGxBWlTbp',
      title: 'Carbon Monster',
      thumbnail: `https://img.youtube.com/vi/dWRGP9CdvUs/mqdefault.jpg`,
      category: "Climate"
    },
    {
      id: '12',
      url: 'https://youtu.be/gf3cTGmvN7s?si=ef87-D9D_HupCJj0',
      title: 'The Waste Industry',
      thumbnail: `https://img.youtube.com/vi/gf3cTGmvN7s/mqdefault.jpg`,
      category: "Waste Management"
    },
    {
      id: '13',
      url: 'https://youtu.be/tZEM5K72aVs?si=pdinP6u9eVu6KWHu',
      title: 'Solution For Waste In India',
      thumbnail: `https://img.youtube.com/vi/tZEM5K72aVs/mqdefault.jpg`,
      category: "Waste Management"
    },
    {
      id: '14',
      url: 'https://youtu.be/94Qqzbz7hZE?si=i0TE5tyPN31RgDZp',
      title: 'Waste To Power',
      thumbnail: `https://img.youtube.com/vi/94Qqzbz7hZE/mqdefault.jpg`,
      category: "Waste Management"
    },
    {
      id: '15',
      url: 'https://youtu.be/1STaZYZ-P1w?si=tHSi5pykbWuUNNgZ',
      title: 'Plastic To Power',
      thumbnail: `https://img.youtube.com/vi/1STaZYZ-P1w/mqdefault.jpg`,
      category: "Recycling"
    },
    {
      id: '16',
      url: 'https://youtu.be/9GMbRG9CZJw?si=RhLF_ype5eDZBd03',
      title: 'What is Plastic?',
      thumbnail: `https://img.youtube.com/vi/9GMbRG9CZJw/mqdefault.jpg`,
      category: "Recycling"
    },
    {
      id: '17',
      url: 'https://youtu.be/RIT3UyoDE9Q?si=-oCaxHVYktTqMjG7',
      title: 'How Plastics Are Converted?',
      thumbnail: `https://img.youtube.com/vi/RIT3UyoDE9Q/mqdefault.jpg`,
      category: "Recycling"
    },
    {
      id: '18',
      url: 'https://youtu.be/YTcjXtNyWVA?si=Zmm508aun95Uj52Q',
      title: 'What Is E-Waste?',
      thumbnail: `https://img.youtube.com/vi/YTcjXtNyWVA/mqdefault.jpg`,
      category: "E-Waste"
    },
    {
      id: '19',
      url: 'https://youtu.be/CmP67zq5hfo?si=dOMUgujSE8NIo_Nf',
      title: 'Indian E-Waste Management',
      thumbnail: `https://img.youtube.com/vi/CmP67zq5hfo/mqdefault.jpg`,
      category: "E-Waste"
    },
    {
      id: '20',
      url: 'https://youtu.be/FmJFVmtWf-I?si=okwQlW6FVrdDKFbD',
      title: 'The Problem With E-Waste',
      thumbnail: `https://img.youtube.com/vi/FmJFVmtWf-I/mqdefault.jpg`,
      category: "E-Waste"
    },
    {
      id: '21',
      url: 'https://youtu.be/3s_ZNEFPiE0?si=AGmCbYc8ngySIuYP',
      title: 'recycling of E-Waste',
      thumbnail: `https://img.youtube.com/vi/3s_ZNEFPiE0/mqdefault.jpg`,
      category: "E-Waste"
    },
    {
      id: '22',
      url: 'https://youtu.be/Lg9ZWAtIT1o?si=o3ycML-7IrNCrucO',
      title: 'India and E-Waste',
      thumbnail: `https://img.youtube.com/vi/Lg9ZWAtIT1o/mqdefault.jpg`,
      category: "E-Waste"
    },
    {
      id: '23',
      url: 'https://youtu.be/KVTxV_9ZZUg?si=4rTslFycGXyzl_IQ',
      title: 'The Invicible Killer',
      thumbnail: `https://img.youtube.com/vi/KVTxV_9ZZUg/mqdefault.jpg`,
      category: "Climate"
    },
    {
      id: '24',
      url: 'https://youtu.be/jAa58N4Jlos?si=DvHpkrAxklQ1jzkR',
      title: 'How Climate Change',
      thumbnail: `https://img.youtube.com/vi/jAa58N4Jlos/mqdefault.jpg`,
      category: "Climate"
    },
    {
      id: '25',
      url: 'https://youtu.be/eRLJscAlk1M?si=S7VDLRBqPTqt6dMe',
      title: 'Dear Future Generations',
      thumbnail: `https://img.youtube.com/vi/eRLJscAlk1M/mqdefault.jpg`,
      category: "Sustainability"
    },
    {
      id: '26',
      url: 'https://youtu.be/VrzbRZn5Ed4?si=GfU8CouE4MUamQgq',
      title: 'Man vs Earth',
      thumbnail: `https://img.youtube.com/vi/VrzbRZn5Ed4/mqdefault.jpg`,
      category: "Climate"
    },
    {
      id: '27',
      url: 'https://youtu.be/pTrJgifaVxs?si=rf8OiMF1bfoR5Ib_',
      title: 'Not Too Late',
      thumbnail: `https://img.youtube.com/vi/pTrJgifaVxs/mqdefault.jpg`,
      category: "Climate"
    },
    {
      id: '28',
      url: 'https://youtu.be/lU9grZFexes?si=8rqB7TtmiopgRxcE',
      title: 'Environment Awareness',
      thumbnail: `https://img.youtube.com/vi/lU9grZFexes/mqdefault.jpg`,
      category: "Sustainability"
    },
    {
      id: '29',
      url: 'https://youtu.be/-yUoerVaWMU?si=8_RAtIv-JGE4kfHa',
      title: 'Our Planet Earth',
      thumbnail: `https://img.youtube.com/vi/-yUoerVaWMU/mqdefault.jpg`,
      category: "Climate"
    },
    {
      id: '30',
      url: 'https://youtu.be/F_gYWVkp_pU?si=g4dI2ugSrtBouqoT',
      title: 'A Prayer For Earth',
      thumbnail: `https://img.youtube.com/vi/F_gYWVkp_pU/mqdefault.jpg`,
      category: "Sustainability"
    },
  ]);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = useMemo(() => {
    let result = videos;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(video => video.category === selectedCategory);
    }
    
    return result;
  }, [videos, searchQuery, selectedCategory]);

  const renderVideoItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.videoCard, { 
        marginLeft: index % 2 === 0 ? 0 : 10,
        transform: [{ translateY: index % 4 === 0 || index % 4 === 3 ? 20 : 0 }] 
      }]}
      onPress={() => {
        console.log("Setting selected video:", item);
        setSelectedVideo(item);
      }}
      activeOpacity={0.9}
    >
      <View style={styles.videoCardInner}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        />
        
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.playIconContainer}>
            <MaterialCommunityIcons name="play-circle" size={30} color="#fff" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.categoryItemActive
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.categoryTextActive
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111?q=80&w=1000&auto=format&fit=crop' }}
        style={styles.headerBackground}
      >
        <LinearGradient
          colors={['rgba(17, 24, 39, 0.7)', '#111827']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <MaterialCommunityIcons name="earth" size={32} color="#22d3ee" />
            <Text style={styles.headerTitle}>EcoLearn</Text>
          </View>
          <Text style={styles.headerSubtitle}>Discover and learn how to save our planet</Text>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#a5f3fc" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search environmental videos..."
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      {selectedVideo && (
        <View style={styles.videoPlayer}>
          <View style={styles.videoBlurBackground}>
            {Platform.OS === 'ios' ? (
              <BlurView intensity={80} tint="dark" style={styles.blurView} />
            ) : (
              <View style={[styles.blurView, { backgroundColor: 'rgba(17, 24, 39, 0.9)' }]} />
            )}
          </View>
          
          <View style={styles.webViewContainer}>
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${extractYouTubeId(selectedVideo.url)}?modestbranding=1&rel=0&autoplay=1&playsinline=1`
              }}
              style={styles.webView}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsFullscreenVideo={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              useWebKit={true}
              startInLoadingState={true}
              originWhitelist={['*']}
            />
          </View>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedVideo(null)}
          >
            <Ionicons name="close-circle-outline" size={40} color="#22d3ee" />
          </TouchableOpacity>
        </View>
      )}

      {filteredVideos.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <MaterialCommunityIcons name="movie-search" size={60} color="#64748b" />
          <Text style={styles.noResultsText}>No videos found</Text>
          <Text style={styles.noResultsSubtext}>Try a different search term or category</Text>
        </View>
      ) : (
        <FlatList
          data={filteredVideos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.videosContainer}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // Dark blue background
  },
  headerBackground: {
    height: 180,
  },
  headerGradient: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#a5f3fc',
    textAlign: 'center',
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 15,
    margin: 15,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#fff',
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryList: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  categoryItemActive: {
    backgroundColor: '#22d3ee',
    borderColor: '#22d3ee',
  },
  categoryText: {
    color: '#94a3b8',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#0f172a',
    fontWeight: 'bold',
  },
  videosContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  videoCard: {
    flex: 1,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  videoCardInner: {
    position: 'relative',
    height: 200,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  videoInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 8,
  },
  categoryTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.9)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  playIconContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBlurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  webViewContainer: {
    width: '90%',
    height: width * 0.9 * 9/16, // 16:9 aspect ratio
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#334155',
    backgroundColor: '#000',
  },
  webView: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1001,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#94a3b8',
    marginTop: 20,
  },
  noResultsSubtext: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 10,
    textAlign: 'center',
  },
});