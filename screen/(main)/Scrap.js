/** 담당자 채윤 
 * 240810 - 스크랩한 글 보기 */

import { useEffect, useState } from "react";
import useUsers from "../../hook/useUsers";
import { useFocusEffect } from "@react-navigation/native";
<<<<<<< Updated upstream
import useBoard from "../../hook/useBoard";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const Scrap = ({navigation, route}) => {
    const {sessionCheck} = useUsers();
    const {getScrapList} = useBoard();
    useFocusEffect(()=>{
        sessionCheck(route);
    })
    const [scrapList, setScrapList] = useState([]);
    const [statusMode, setStatusMode] = useState('RECRUIT_ONGOING');
    useEffect(()=>{
        getScrapList(statusMode).then(response=>{
            if (!response.isFailed){
                const scrapList = response.scrapList.filter(item=>item.recruitStatus===statusMode);
                setScrapList(scrapList);
            } else {
                Alert.alert('스크랩 목록을 불러올 수 없습니다.');
            }
        })
    },[statusMode])
    return(
        <View style={{flex:1, backgroundColor:'#495579', paddingHorizontal:wp(4)}}>
          <ScrollView contentContainerStyle={scrapList.length === 0 ? { flex: 1, backgroundColor:'#495579'} : {backgroundColor:'#495579'}}>
            <View style={{ flexDirection: 'row', justifyContent:'space-around', marginTop:hp('3%')}}>
              <TouchableOpacity onPress={() => {
                setStatusMode('RECRUIT_ONGOING');
              }} style={[ {paddingHorizontal:'7%', paddingVertical:hp('2%'), borderRadius:10},
                statusMode === 'RECRUIT_ONGOING' ? {backgroundColor: '#263159'} : { backgroundColor: 'white' }]}>
                <Text style={statusMode === 'RECRUIT_ONGOING' ? { color: '#FFFFFF', fontWeight:'500' } : { }}>모집 중</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setStatusMode('RECRUIT_COMPLETE')
              }} style={[ {paddingHorizontal:'7%', paddingVertical:hp('2%'), borderRadius:10},
                statusMode === 'RECRUIT_COMPLETE' ? { backgroundColor: '#263159' } : { backgroundColor: 'white' }]}>
                <Text style={statusMode === 'RECRUIT_COMPLETE' ? { color: '#FFFFFF', fontWeight:'500'  } : {  }}>모집 완료</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setStatusMode('COMPLETE')
              }} style={[ {paddingHorizontal:'7%', paddingVertical:hp('2%'), borderRadius:10},
              statusMode === 'COMPLETE' ? {backgroundColor:'#263159'}:{backgroundColor:'white'}]}>
                <Text style={statusMode === 'COMPLETE' ? { color: '#FFFFFF' , fontWeight:'500' } : { }}>개발 완료</Text>
              </TouchableOpacity>
            </View>
            {scrapList.length === 0 ? (
              <Empty/>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:hp(3)}}>
              {scrapList.map((item, index) => {
                const date = new Date(item?.modifiedDate);      
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const newMonth = month.toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const dateFormat = `${year}.${newMonth}.${day}`   
                return (
                  <TouchableOpacity activeOpacity={0.4} key={index} onPress={()=>navigation.navigate('PostDetail', {
                    title:(statusMode==='RECRUIT_ONGOING'?'모집 중':
                    statusMode==='RECRUIT_COMPLETE'?'모집 완료':
                    statusMode==='COMPLETE'?'개발 완료':undefined), boardId:item.boardId})}>
                    <View style={{
                      borderRadius: 10,  marginBottom: hp('1.5%'), elevation: 1,
                      backgroundColor: 'white', padding: hp('2%')}}>
                      {item.imageUrl ? (
                        <View style={{ width: '30%' }}>
                          <Text>{`${item.imageUrl}`}</Text>
                        </View>
                      ) : undefined}
                      <View style={{}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                          <Text style={{fontWeight:'500', fontSize:13, width:wp(40)}}>{`${item.roles}`}</Text>
                          <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontWeight:'500', fontSize:15, color:'gray', marginBottom:hp(0.2), marginRight:wp(2)}}>{`${dateFormat}`}</Text>
                            <MaterialCommunityIcons name="comment-outline" size={18} color="black" />
                            <Text style={{marginLeft:hp('0.3%')}}>{item.commentCount}</Text>
                            <FontAwesome name="bookmark-o" size={18} color="black" style={{marginLeft:hp('1.5%')}}/>
                            <Text style={{marginLeft:hp('0.5%')}}>{item.scrapCount}</Text>
                          </View>
                        </View>
                        <Text style={{fontSize:21, fontWeight:'500'}}>{`${item.title}`}</Text>
                        <Text style={{fontSize:13, marginTop:hp(0.8), color:'gray'}}>{`예상 기간 - ${item.expectedDuration}`}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) 
              })}
              </ScrollView>
            )}
          </ScrollView>
        </View>
    )
}

function Empty(){
    return(
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <View style={{backgroundColor:'#A1ADBC', width:'85%', height:hp('35%'), borderRadius:20, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:15, color:'#F3F5F6', fontWeight:'500'}}>아직 스크랩한 게시글이 없습니다.</Text>
        </View>
      </View>
    )
  }

export default Scrap;


/**
 * 
 * import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DefaultLayout from "../../layout/keyboardlayout";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Modal } from "react-native";
import AuthLayout from "../../layout/authlayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loading from "../(other)/loading";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Scrap({navigation, route}) {
  const [scrapList, setScrapList] = useState([]);
  const [statusMode, setStatusMode] = useState('RECRUIT_ONGOING');
  const getScrapPost = async(statusMode) => {
    const boardType = (statusMode==='COMPLETE'?'complete':'recruit');
    try{
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      axios.get(`${API_URL}/api/auth/scrap?boardType=${boardType}`, { 
        headers: {Authorization: `Bearer ${token.token}`}
      })
      .then(res => {
        // console.log(res.data.data);
        const result = res.data.data;
        const scrapList = result.filter(item=>item.recruitStatus===statusMode);
        setScrapList(scrapList);
      })
      .catch(err => {
        console.log(err)
      })
    } catch(err) {
      // console.log(err)
    }
  }
  useEffect(()=>{
    getScrapPost(statusMode);
  },[statusMode])
    return (
      <AuthLayout navigation={navigation} route={route}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={scrapList.length === 0 ? { flex: 1 } : undefined}>
            <View style={{ flexDirection: 'row', justifyContent:'space-around', marginTop:hp('3%')}}>
              <TouchableOpacity onPress={() => {
                setStatusMode('RECRUIT_ONGOING');
              }} style={[ {paddingHorizontal:'7%', paddingVertical:hp('1%'), borderRadius:10},
                statusMode === 'RECRUIT_ONGOING' ? { backgroundColor: '#425E7F' } : { backgroundColor: 'white' }]}>
                <Text style={statusMode === 'RECRUIT_ONGOING' ? { color: '#FFFFFF' } : { backgroundColor: 'white' }}>모집 중</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setStatusMode('RECRUIT_COMPLETE')
              }} style={[ {paddingHorizontal:'7%', paddingVertical:hp('1%'), borderRadius:10},
                statusMode === 'RECRUIT_COMPLETE' ? { backgroundColor: '#425E7F' } : { backgroundColor: 'white' }]}>
                <Text style={statusMode === 'RECRUIT_COMPLETE' ? { color: '#FFFFFF' } : { backgroundColor: 'white' }}>모집 완료</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setStatusMode('COMPLETE')
              }} style={[ {paddingHorizontal:'7%', paddingVertical:hp('1%'), borderRadius:10},
              statusMode === 'COMPLETE' ? {backgroundColor:'#425E7F'}:{backgroundColor:'white'}]}>
                <Text style={statusMode === 'COMPLETE' ? { color: '#FFFFFF' } : { backgroundColor: 'white' }}>개발 완료</Text>
              </TouchableOpacity>
            </View>
            {scrapList.length === 0 ? (
              <Empty/>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:30}}>
              {scrapList.map((item, index) => {
                const date = new Date(item?.modifiedDate);      
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const newMonth = month.toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const dateFormat = `${year}.${newMonth}.${day}`   
                return (
                  <TouchableOpacity activeOpacity={0.4} key={index} onPress={()=>navigation.navigate('PostDetail', {
                    title:(statusMode==='RECRUIT_ONGOING'?'모집 중':
                    statusMode==='RECRUIT_COMPLETE'?'모집 완료':
                    statusMode==='COMPLETE'?'개발 완료':undefined), boardId:item.boardId})}>
                    <View style={{
                      borderRadius: 10,  marginBottom: hp('1.5%'), elevation: 1,
                      backgroundColor: 'white', padding: hp('2%')}}>
                      {item.imageUrl ? (
                        <View style={{ width: '30%' }}>
                          <Text>{`${item.imageUrl}`}</Text>
                        </View>
                      ) : undefined}
                      <View style={{}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                          <Text style={{fontWeight:'500', fontSize:13, width:wp(40)}}>{`${item.roles}`}</Text>
                          <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontWeight:'500', fontSize:15, color:'gray', marginBottom:hp(0.2), marginRight:wp(2)}}>{`${dateFormat}`}</Text>
                            <MaterialCommunityIcons name="comment-outline" size={18} color="black" />
                            <Text style={{marginLeft:hp('0.3%')}}>{item.commentCount}</Text>
                            <FontAwesome name="bookmark-o" size={18} color="black" style={{marginLeft:hp('1.5%')}}/>
                            <Text style={{marginLeft:hp('0.5%')}}>{item.scrapCount}</Text>
                          </View>
                        </View>
                        <Text style={{fontSize:21, fontWeight:'500'}}>{`${item.title}`}</Text>
                        <Text style={{fontSize:13, marginTop:hp(0.8), color:'gray'}}>{`예상 기간 - ${item.expectedDuration}`}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) 
              })}
              </ScrollView>
            )}
          </ScrollView>
        </View>
      </AuthLayout>
    );
  };
  
function Empty(){
  return(
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <View style={{backgroundColor:'#A1ADBC', width:'85%', height:hp('35%'), borderRadius:20, justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:15, color:'#F3F5F6', fontWeight:'500'}}>아직 스크랩한 게시글이 없습니다.</Text>
      </View>
    </View>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal:'5%'
    },
  });
 * 
 */
=======
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Scrap({navigation, route}) {
        
  const [scrapList, setScrapList] = useState([]);
  const [statusMode, setStatusMode] = useState('RECRUIT_ONGOING');
  const {sessionCheck} = useUsers();
        useFocusEffect(()=>{
            sessionCheck(route);
        })
        
  const getScrapPost = async(statusMode) => {
    const boardType = (statusMode==='COMPLETE'?'complete':'recruit');
    try{
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      axios.get(`${API_URL}/api/auth/scrap?boardType=${boardType}`, { 
        headers: {Authorization: `Bearer ${token.token}`}
      })
      .then(res => {
        const result = res.data.data;
        const scrapList = result.filter(item=>item.recruitStatus===statusMode);
        setScrapList(scrapList);
      })
      .catch(err => {
        console.log(err)
      })
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getScrapPost(statusMode);
  },[statusMode])
    return (
        <View style={styles.container}>
        <ScrollView contentContainerStyle={scrapList.length === 0 ? { flex: 1 } : undefined}>
          <View style={{ flexDirection: 'row', justifyContent:'space-around'}}>
            <TouchableOpacity onPress={() => {
              setStatusMode('RECRUIT_ONGOING');
            }} style={[ {paddingHorizontal:'7%', paddingVertical:hp('1%'), borderRadius:10},
              statusMode === 'RECRUIT_ONGOING' ? { backgroundColor: '#425E7F' } : { backgroundColor: 'white' }]}>
              <Text style={statusMode === 'RECRUIT_ONGOING' ? { color: '#FFFFFF' } : { backgroundColor: 'white' }}>모집 중</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setStatusMode('RECRUIT_COMPLETE')
            }} style={[ {paddingHorizontal:'7%', paddingVertical:hp('1%'), borderRadius:10},
              statusMode === 'RECRUIT_COMPLETE' ? { backgroundColor: '#425E7F' } : { backgroundColor: 'white' }]}>
              <Text style={statusMode === 'RECRUIT_COMPLETE' ? { color: '#FFFFFF' } : { backgroundColor: 'white' }}>모집 완료</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setStatusMode('COMPLETE')
            }} style={[ {paddingHorizontal:'7%', paddingVertical:hp('1%'), borderRadius:10},
            statusMode === 'COMPLETE' ? {backgroundColor:'#425E7F'}:{backgroundColor:'white'}]}>
              <Text style={statusMode === 'COMPLETE' ? { color: '#FFFFFF' } : { backgroundColor: 'white' }}>개발 완료</Text>
            </TouchableOpacity>
          </View>
          {scrapList.length === 0 ? (
            <Empty/>
          ) : (
            <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicato={false}>
                {scrapList ? scrapList.map((item, index)=>{
                    const date = new Date(item?.modifiedDate);
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    const newMonth = month.toString().padStart(2,'0');
                    const day = date.getDate().toString().padStart(2,'0');
                    const hours = date.getHours().toString().padStart(2,'0');
                    const minutes = date.getMinutes().toString().padStart(2,'0');
                    const dateFormat = `${year}.${newMonth}.${day}  ${hours}:${minutes}`
                    return(
                    <TouchableOpacity activeOpacity={0.5} key={index} onPress={()=>navigation.navigate('PostDetail', {boardId: item.boardId})} >
                    <View style={{ borderRadius: 10, height:hp('22%'), marginBottom:hp('1.5%'), elevation:1,
                    backgroundColor:'white', padding:hp('1.5%'), justifyContent:'space-between'}}>
                        <View>
                            <View style={{flexDirection:'row', marginBottom:hp('0.3%')}}>
                                {item.roles.map((role, index)=>{
                                    let roleName = '';
                                    if (role === 'BACK') roleName = '백엔드';
                                    else if (role === 'FRONT') roleName = '프론트엔드';
                                    else if (role === 'DESIGN') roleName = '디자인';
                                    else if (role === 'FULL') roleName = '풀스택';
                                    else if (role === 'PM') roleName = '기획';
                                    else roleName = role.toString();
                                    return (
                                    <View key={index} style={[{borderRadius:15, paddingVertical:2, paddingHorizontal:4,marginRight:hp('0.5%')},
                                    role=='BACK'? {backgroundColor:'#8FCACA'}: role=='FRONT' ? {backgroundColor:'#FFAEA5'} :
                                    role=='DESIGN' ? {backgroundColor:'#EFD0B2'}: role=='PM' ? {backgroundColor:'#CBAACB'} :
                                    role=='AI' ? {backgroundColor: '#F3B0C3'}: role=='FULL' ? {backgroundColor:'#B6CFB6'} : {backgroundColor: '#AFAFAF'}]}>
                                        <Text style={{fontSize:12, color:'white', fontWeight:'500'}}>{` ${roleName} `}</Text>
                                    </View>
                                )})}
                            </View>
                            <View>
                                <Text style={{fontSize:25}}>{item.title}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize:15}}>예상기간 : {item.expectedDuration}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <Text>{dateFormat}</Text>
                            <View style={{flexDirection:'row'}}>
                                <MaterialCommunityIcons name="comment-outline" size={23} color="black" />
                                <Text style={{marginLeft:hp('0.3%')}}>{item.commentCount}</Text>
                                <FontAwesome name="bookmark-o" size={23} color="black" style={{marginLeft:hp('1.5%')}}/>
                                <Text style={{marginLeft:hp('0.5%')}}>{item.scrapCount}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                    )

                }):(<Loading/>)} 

            </ScrollView>
        </View>
          )}
        </ScrollView>
      </View>
        
    );
  };
  
function Empty(){
  return(
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <View style={{backgroundColor:'#A1ADBC', width:'85%', height:hp('35%'), borderRadius:20, justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:15, color:'#F3F5F6', fontWeight:'500'}}>아직 스크랩한 게시글이 없습니다.</Text>
      </View>
    </View>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal:'3%',
      marginVertical: '5%',
    },
  });



>>>>>>> Stashed changes
