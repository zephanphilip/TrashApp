// import React, { useState, useMemo } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, SafeAreaView, StatusBar } from 'react-native';
// import { WebView } from 'react-native-webview';

// const extractYouTubeId = (url) => {
//   const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// export default function EducationalContent() {
//   const [videos, setVideos] = useState([
//     {
//       id: '1',
//       url: 'https://www.youtube.com/watch?v=8facy0nK8Lw',
//       title: 'The Plastic Age',
//       thumbnail: `https://img.youtube.com/vi/8facy0nK8Lw/mqdefault.jpg`
//     },
//     {
//       id: '2',
//       url: 'https://youtu.be/W5bh1JFo43U?si=b30y8vKRE87FeAvi',
//       title: 'There is NO Planet B!',
//       thumbnail: `https://img.youtube.com/vi/W5bh1JFo43U/mqdefault.jpg`
//     },
//     {
//         id: '3',
//         url: 'https://youtu.be/JaSe85Mcwp0?si=3tBx8uM2CbiPmZTJ',
//         title: 'Man and Pollution',
//         thumbnail: `https://img.youtube.com/vi/JaSe85Mcwp0/mqdefault.jpg`
//     },
//     {
//         id: '4',
//         url: 'https://youtu.be/uUmtJIBibMM?si=EHgNT7xrdICS79JL',
//         title: 'Why Trash?',
//         thumbnail: `https://img.youtube.com/vi/uUmtJIBibMM/mqdefault.jpg`
//     },  
//     {
//         id: '5',
//         url: 'https://youtu.be/HgEo7YnvJs0?si=xMuloc37RrRNl5Md',
//         title: 'How To Manage?',
//         thumbnail: `https://img.youtube.com/vi/HgEo7YnvJs0/mqdefault.jpg`
//     },
//     {
//         id: '6',
//         url: 'https://youtu.be/zx04Kl8y4dE?si=-myQcdz3OItmY3l6',
//         title: 'What is Sustainability?',
//         thumbnail: `https://img.youtube.com/vi/zx04Kl8y4dE/mqdefault.jpg`
//     },
//     {
//         id: '7',
//         url: 'https://youtu.be/iY77zvY6Is4?si=cPJ20yv2AwQ4ZDTh',
//         title: 'Global Goals',
//         thumbnail: `https://img.youtube.com/vi/iY77zvY6Is4/mqdefault.jpg`
//     },
//     {
//         id: '8',
//         url: 'https://youtu.be/x_sJzVe9P_8?si=DwFe30PIjseHuNj0',
//         title: 'Green House Effect',
//         thumbnail: `https://img.youtube.com/vi/x_sJzVe9P_8/mqdefault.jpg`
//     },
//     {
//         id: '9',
//         url: 'https://youtu.be/PqxMzKLYrZ4?si=oNYzTAvCyMdUPERO',
//         title: 'Global Warming',
//         thumbnail: `https://img.youtube.com/vi/PqxMzKLYrZ4/mqdefault.jpg`
//     },
//     {
//         id: '10',
//         url: 'https://youtu.be/tykLKCT7DyY?si=9j0_4uZm0pxZb-9l',
//         title: 'Climate Change',
//         thumbnail: `https://img.youtube.com/vi/tykLKCT7DyY/mqdefault.jpg`
//     },
//     {
//         id: '11',
//         url: 'https://youtu.be/dWRGP9CdvUs?si=S38fScRVGxBWlTbp',
//         title: 'Carbon Monster',
//         thumbnail: `https://img.youtube.com/vi/dWRGP9CdvUs/mqdefault.jpg`
//     },
//     {
//       id: '12',
//       url: 'https://youtu.be/gf3cTGmvN7s?si=ef87-D9D_HupCJj0',
//       title: 'The Waste Industry',
//       thumbnail: `https://img.youtube.com/vi/gf3cTGmvN7s/mqdefault.jpg`
//     },
//     {
//       id: '13',
//       url: 'https://youtu.be/tZEM5K72aVs?si=pdinP6u9eVu6KWHu',
//       title: 'Solution For Waste In India',
//       thumbnail: `https://img.youtube.com/vi/tZEM5K72aVs/mqdefault.jpg`
//     },
//     {
//       id: '14',
//       url: 'https://youtu.be/94Qqzbz7hZE?si=i0TE5tyPN31RgDZp',
//       title: 'Waste To Power',
//       thumbnail: `https://img.youtube.com/vi/94Qqzbz7hZE/mqdefault.jpg`
//     },
//     {
//       id: '15',
//       url: 'https://youtu.be/1STaZYZ-P1w?si=tHSi5pykbWuUNNgZ',
//       title: 'Plastic To Power',
//       thumbnail: `https://img.youtube.com/vi/1STaZYZ-P1w/mqdefault.jpg`
//     },
//     {
//       id: '16',
//       url: 'https://youtu.be/9GMbRG9CZJw?si=RhLF_ype5eDZBd03',
//       title: 'What is Plastic?',
//       thumbnail: `https://img.youtube.com/vi/9GMbRG9CZJw/mqdefault.jpg`
//     },
//     {
//       id: '17',
//       url: 'https://youtu.be/RIT3UyoDE9Q?si=-oCaxHVYktTqMjG7',
//       title: 'How Plastics Are Converted?',
//       thumbnail: `https://img.youtube.com/vi/RIT3UyoDE9Q/mqdefault.jpg`
//     },
//     {
//       id: '18',
//       url: 'https://youtu.be/YTcjXtNyWVA?si=Zmm508aun95Uj52Q',
//       title: 'What Is E-Waste?',
//       thumbnail: `https://img.youtube.com/vi/YTcjXtNyWVA/mqdefault.jpg`
//     },
//     {
//       id: '19',
//       url: 'https://youtu.be/CmP67zq5hfo?si=dOMUgujSE8NIo_Nf',
//       title: 'Indian E-Waste Management',
//       thumbnail: `https://img.youtube.com/vi/CmP67zq5hfo/mqdefault.jpg`
//     },
//     {
//       id: '20',
//       url: 'https://youtu.be/FmJFVmtWf-I?si=okwQlW6FVrdDKFbD',
//       title: 'The Problem With E-Waste',
//       thumbnail: `https://img.youtube.com/vi/FmJFVmtWf-I/mqdefault.jpg`
//     },
//     {
//       id: '21',
//       url: 'https://youtu.be/3s_ZNEFPiE0?si=AGmCbYc8ngySIuYP',
//       title: 'recycling of E-Waste',
//       thumbnail: `https://img.youtube.com/vi/3s_ZNEFPiE0/mqdefault.jpg`
//     },
//     {
//       id: '22',
//       url: 'https://youtu.be/Lg9ZWAtIT1o?si=o3ycML-7IrNCrucO',
//       title: 'India and E-Waste',
//       thumbnail: `https://img.youtube.com/vi/Lg9ZWAtIT1o/mqdefault.jpg`
//     },
//     {
//       id: '23',
//       url: 'https://youtu.be/KVTxV_9ZZUg?si=4rTslFycGXyzl_IQ',
//       title: 'The Invicible Killer',
//       thumbnail: `https://img.youtube.com/vi/KVTxV_9ZZUg/mqdefault.jpg`
//     },
//     {
//       id: '24',
//       url: 'https://youtu.be/jAa58N4Jlos?si=DvHpkrAxklQ1jzkR',
//       title: 'How Climate Change',
//       thumbnail: `https://img.youtube.com/vi/jAa58N4Jlos/mqdefault.jpg`
//     },
//     {
//       id: '25',
//       url: 'https://youtu.be/eRLJscAlk1M?si=S7VDLRBqPTqt6dMe',
//       title: 'Dear Future Generations',
//       thumbnail: `https://img.youtube.com/vi/eRLJscAlk1M/mqdefault.jpg`
//     },
//     {
//       id: '26',
//       url: 'https://youtu.be/VrzbRZn5Ed4?si=GfU8CouE4MUamQgq',
//       title: 'Man vs Earth',
//       thumbnail: `https://img.youtube.com/vi/VrzbRZn5Ed4/mqdefault.jpg`
//     },
//     {
//       id: '27',
//       url: 'https://youtu.be/pTrJgifaVxs?si=rf8OiMF1bfoR5Ib_',
//       title: 'Not Too Late',
//       thumbnail: `https://img.youtube.com/vi/pTrJgifaVxs/mqdefault.jpg`
//     },
//     {
//       id: '28',
//       url: 'https://youtu.be/lU9grZFexes?si=8rqB7TtmiopgRxcE',
//       title: 'Environment Awareness',
//       thumbnail: `https://img.youtube.com/vi/lU9grZFexes/mqdefault.jpg`
//     },
//     {
//       id: '29',
//       url: 'https://youtu.be/-yUoerVaWMU?si=8_RAtIv-JGE4kfHa',
//       title: 'Our Planet Earth',
//       thumbnail: `https://img.youtube.com/vi/-yUoerVaWMU/mqdefault.jpg`
//     },
//     {
//       id: '30',
//       url: 'https://youtu.be/F_gYWVkp_pU?si=g4dI2ugSrtBouqoT',
//       title: 'A Prayer For Earth',
//       thumbnail: `https://img.youtube.com/vi/F_gYWVkp_pU/mqdefault.jpg`
//     },
       

//     // ... (all previous video entries remain the same)
//   ]);

//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Memoized filtered videos based on search query
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
//     >
//       <Image
//         source={{ uri: item.thumbnail }}
//         style={styles.thumbnail}
//         resizeMode="cover"
//       />
//       <View style={styles.videoTextContainer}>
//         <Text style={styles.videoTitle}>{item.title}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <Text style={styles.header}>SAVE THE PLANET !</Text>
     
//       {/* Search Input */}
//       <View style={styles.searchContainer}>
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
//             <Text style={styles.closeButtonText}>Close</Text>
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
//     container: {
//       flex: 1,
//       backgroundColor: '#fFF',
//     },
//     header: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       padding: 15,
//       backgroundColor: '#5d6839',
//       color: '#fdf9e1',
//     },
//     listContainer: {
//       paddingHorizontal: 15,
//       paddingTop: 10,
//     },
//     videoItem: {
//       backgroundColor: 'white',
//       borderRadius: 12,
//       marginVertical: 10,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 4 },
//       shadowOpacity: 0.15,
//       shadowRadius: 6,
//       elevation: 5,
//       overflow: 'hidden',
//     },
//     thumbnail: {
//       width: '100%',
//       height: 200,
//     },
//     videoTextContainer: {
//       padding: 15,
//       backgroundColor: '#dee2cb',
//     },
//     videoTitle: {
//       fontSize: 18,
//       fontWeight: '600',
//       color: '#5d6839',
//     },
//     videoContainer: {
//       width: '100%',
//       aspectRatio: 16 / 9,
//       backgroundColor: 'black',
//       marginBottom: 15,
//     },
//     video: {
//       width: '100%',
//       height: '100%',
//     },
//     closeButton: {
//       position: 'absolute',
//       top: 10,
//       right: 10,
//       backgroundColor: 'rgba(255,255,255,0.8)',
//       padding: 10,
//       borderRadius: 8,
//     },
//     closeButtonText: {
//       color: 'black',
//       fontWeight: 'bold',
//     },
//     searchContainer: {
//       paddingHorizontal: 15,
//       paddingVertical: 10,
//     },
//     searchInput: {
//       height: 50,
//       borderWidth: 0,
//       backgroundColor: '#f0f4f8',
//       borderRadius: 25,
//       paddingHorizontal: 20,
//       fontSize: 16,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     noResultsContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 20,
//     },
//     noResultsText: {
//       fontSize: 18,
//       color: '#888',
//     },
//   });
 
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const extractYouTubeId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default function EducationalContent() {
  const [videos, setVideos] = useState([
    {
              id: '1',
              url: 'https://www.youtube.com/watch?v=8facy0nK8Lw',
              title: 'The Plastic Age',
              thumbnail: `https://img.youtube.com/vi/8facy0nK8Lw/mqdefault.jpg`
            },
            {
              id: '2',
              url: 'https://youtu.be/W5bh1JFo43U?si=b30y8vKRE87FeAvi',
              title: 'There is NO Planet B!',
              thumbnail: `https://img.youtube.com/vi/W5bh1JFo43U/mqdefault.jpg`
            },
            {
                id: '3',
                url: 'https://youtu.be/JaSe85Mcwp0?si=3tBx8uM2CbiPmZTJ',
                title: 'Man and Pollution',
                thumbnail: `https://img.youtube.com/vi/JaSe85Mcwp0/mqdefault.jpg`
            },
            {
                id: '4',
                url: 'https://youtu.be/uUmtJIBibMM?si=EHgNT7xrdICS79JL',
                title: 'Why Trash?',
                thumbnail: `https://img.youtube.com/vi/uUmtJIBibMM/mqdefault.jpg`
            },  
            {
                id: '5',
                url: 'https://youtu.be/HgEo7YnvJs0?si=xMuloc37RrRNl5Md',
                title: 'How To Manage?',
                thumbnail: `https://img.youtube.com/vi/HgEo7YnvJs0/mqdefault.jpg`
            },
            {
                id: '6',
                url: 'https://youtu.be/zx04Kl8y4dE?si=-myQcdz3OItmY3l6',
                title: 'What is Sustainability?',
                thumbnail: `https://img.youtube.com/vi/zx04Kl8y4dE/mqdefault.jpg`
            },
            {
                id: '7',
                url: 'https://youtu.be/iY77zvY6Is4?si=cPJ20yv2AwQ4ZDTh',
                title: 'Global Goals',
                thumbnail: `https://img.youtube.com/vi/iY77zvY6Is4/mqdefault.jpg`
            },
            {
                id: '8',
                url: 'https://youtu.be/x_sJzVe9P_8?si=DwFe30PIjseHuNj0',
                title: 'Green House Effect',
                thumbnail: `https://img.youtube.com/vi/x_sJzVe9P_8/mqdefault.jpg`
            },
            {
                id: '9',
                url: 'https://youtu.be/PqxMzKLYrZ4?si=oNYzTAvCyMdUPERO',
                title: 'Global Warming',
                thumbnail: `https://img.youtube.com/vi/PqxMzKLYrZ4/mqdefault.jpg`
            },
            {
                id: '10',
                url: 'https://youtu.be/tykLKCT7DyY?si=9j0_4uZm0pxZb-9l',
                title: 'Climate Change',
                thumbnail: `https://img.youtube.com/vi/tykLKCT7DyY/mqdefault.jpg`
            },
            {
                id: '11',
                url: 'https://youtu.be/dWRGP9CdvUs?si=S38fScRVGxBWlTbp',
                title: 'Carbon Monster',
                thumbnail: `https://img.youtube.com/vi/dWRGP9CdvUs/mqdefault.jpg`
            },
            {
              id: '12',
              url: 'https://youtu.be/gf3cTGmvN7s?si=ef87-D9D_HupCJj0',
              title: 'The Waste Industry',
              thumbnail: `https://img.youtube.com/vi/gf3cTGmvN7s/mqdefault.jpg`
            },
            {
              id: '13',
              url: 'https://youtu.be/tZEM5K72aVs?si=pdinP6u9eVu6KWHu',
              title: 'Solution For Waste In India',
              thumbnail: `https://img.youtube.com/vi/tZEM5K72aVs/mqdefault.jpg`
            },
            {
              id: '14',
              url: 'https://youtu.be/94Qqzbz7hZE?si=i0TE5tyPN31RgDZp',
              title: 'Waste To Power',
              thumbnail: `https://img.youtube.com/vi/94Qqzbz7hZE/mqdefault.jpg`
            },
            {
              id: '15',
              url: 'https://youtu.be/1STaZYZ-P1w?si=tHSi5pykbWuUNNgZ',
              title: 'Plastic To Power',
              thumbnail: `https://img.youtube.com/vi/1STaZYZ-P1w/mqdefault.jpg`
            },
            {
              id: '16',
              url: 'https://youtu.be/9GMbRG9CZJw?si=RhLF_ype5eDZBd03',
              title: 'What is Plastic?',
              thumbnail: `https://img.youtube.com/vi/9GMbRG9CZJw/mqdefault.jpg`
            },
            {
              id: '17',
              url: 'https://youtu.be/RIT3UyoDE9Q?si=-oCaxHVYktTqMjG7',
              title: 'How Plastics Are Converted?',
              thumbnail: `https://img.youtube.com/vi/RIT3UyoDE9Q/mqdefault.jpg`
            },
            {
              id: '18',
              url: 'https://youtu.be/YTcjXtNyWVA?si=Zmm508aun95Uj52Q',
              title: 'What Is E-Waste?',
              thumbnail: `https://img.youtube.com/vi/YTcjXtNyWVA/mqdefault.jpg`
            },
            {
              id: '19',
              url: 'https://youtu.be/CmP67zq5hfo?si=dOMUgujSE8NIo_Nf',
              title: 'Indian E-Waste Management',
              thumbnail: `https://img.youtube.com/vi/CmP67zq5hfo/mqdefault.jpg`
            },
            {
              id: '20',
              url: 'https://youtu.be/FmJFVmtWf-I?si=okwQlW6FVrdDKFbD',
              title: 'The Problem With E-Waste',
              thumbnail: `https://img.youtube.com/vi/FmJFVmtWf-I/mqdefault.jpg`
            },
            {
              id: '21',
              url: 'https://youtu.be/3s_ZNEFPiE0?si=AGmCbYc8ngySIuYP',
              title: 'recycling of E-Waste',
              thumbnail: `https://img.youtube.com/vi/3s_ZNEFPiE0/mqdefault.jpg`
            },
            {
              id: '22',
              url: 'https://youtu.be/Lg9ZWAtIT1o?si=o3ycML-7IrNCrucO',
              title: 'India and E-Waste',
              thumbnail: `https://img.youtube.com/vi/Lg9ZWAtIT1o/mqdefault.jpg`
            },
            {
              id: '23',
              url: 'https://youtu.be/KVTxV_9ZZUg?si=4rTslFycGXyzl_IQ',
              title: 'The Invicible Killer',
              thumbnail: `https://img.youtube.com/vi/KVTxV_9ZZUg/mqdefault.jpg`
            },
            {
              id: '24',
              url: 'https://youtu.be/jAa58N4Jlos?si=DvHpkrAxklQ1jzkR',
              title: 'How Climate Change',
              thumbnail: `https://img.youtube.com/vi/jAa58N4Jlos/mqdefault.jpg`
            },
            {
              id: '25',
              url: 'https://youtu.be/eRLJscAlk1M?si=S7VDLRBqPTqt6dMe',
              title: 'Dear Future Generations',
              thumbnail: `https://img.youtube.com/vi/eRLJscAlk1M/mqdefault.jpg`
            },
            {
              id: '26',
              url: 'https://youtu.be/VrzbRZn5Ed4?si=GfU8CouE4MUamQgq',
              title: 'Man vs Earth',
              thumbnail: `https://img.youtube.com/vi/VrzbRZn5Ed4/mqdefault.jpg`
            },
            {
              id: '27',
              url: 'https://youtu.be/pTrJgifaVxs?si=rf8OiMF1bfoR5Ib_',
              title: 'Not Too Late',
              thumbnail: `https://img.youtube.com/vi/pTrJgifaVxs/mqdefault.jpg`
            },
            {
              id: '28',
              url: 'https://youtu.be/lU9grZFexes?si=8rqB7TtmiopgRxcE',
              title: 'Environment Awareness',
              thumbnail: `https://img.youtube.com/vi/lU9grZFexes/mqdefault.jpg`
            },
            {
              id: '29',
              url: 'https://youtu.be/-yUoerVaWMU?si=8_RAtIv-JGE4kfHa',
              title: 'Our Planet Earth',
              thumbnail: `https://img.youtube.com/vi/-yUoerVaWMU/mqdefault.jpg`
            },
            {
              id: '30',
              url: 'https://youtu.be/F_gYWVkp_pU?si=g4dI2ugSrtBouqoT',
              title: 'A Prayer For Earth',
              thumbnail: `https://img.youtube.com/vi/F_gYWVkp_pU/mqdefault.jpg`
            },
               
  ]);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = useMemo(() => {
    if (!searchQuery) return videos;
    return videos.filter(video =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [videos, searchQuery]);

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => setSelectedVideo(item)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#a8e063', '#56ab2f']}
        style={styles.gradientCard}
      >
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.videoTextContainer}>
          <Text style={styles.videoTitle}>{item.title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#56ab2f" />
      <LinearGradient
        colors={['#56ab2f', '#a8e063']}
        style={styles.headerContainer}
      >
        <Text style={styles.header}>SAVE THE PLANET!</Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search videos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {selectedVideo && (
        <View style={styles.videoContainer}>
          <WebView
            source={{
              uri: `https://www.youtube.com/embed/${extractYouTubeId(selectedVideo.url)}?modestbranding=1&rel=0&autoplay=1&playsinline=1`
            }}
            style={styles.video}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
            startInLoadingState={true}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedVideo(null)}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {filteredVideos.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No videos found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredVideos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    borderRadius: 25,
    paddingHorizontal: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  videoItem: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  gradientCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  videoTextContainer: {
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: 'black',
    marginBottom: 15,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 50,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
});
