import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screen/(auth)/Login";
import Signup from "../screen/(auth)/Signup";
import PasswordFind from "../screen/(auth)/PasswordFind";
import MyPage from "../screen/(main)/MyPage";
import Apply from "../screen/(main)/Apply";
import { Platform, TouchableOpacity } from "react-native";
import Scrap from "../screen/(main)/Scrap";
import Post, { PostButton } from "../screen/(main)/Post";
import { AntDesign, Feather, FontAwesome5, Ionicons, Octicons } from "@expo/vector-icons";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Notification from "../screen/(main)/Notification";
import Resume from "../screen/(main)/Resume";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Auth Pages */}
                <Stack.Screen name="Login" component={Login}
                options={{headerShown: false, cardStyle:{backgroundColor:'white'}}} />    
                <Stack.Screen name="Signup" component={Signup} 
                options={{cardStyle:{backgroundColor:'white'}, title: '회원가입', headerTitleAlign: 'center', headerShadowVisible: false}} />
                <Stack.Screen name="PasswordFind" component={PasswordFind}
                options={{cardStyle:{backgroundColor:'white'}, title:'비밀번호 찾기', headerTitleAlign:'center'}}/>

                {/* Home Page */}
                <Stack.Screen name="MainNavigation" component={MainNavigation}
                options={{headerShown: false, headerMode:'screen', cardStyleInterpolator:(Platform.OS==='ios' ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forBottomSheetAndroid) }}/>
                <Stack.Screen name="Notification" component={Notification}
                options={{headerTitle: '알림', headerTitleAlign: 'center', cardStyleInterpolator: (Platform.OS==='ios' ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forFadeFromBottomAndroid)}}/>

                {/* Important Page */}
                <Stack.Screen name="Post" component={Post}
                options={{headerTitle:'글 작성',headerTitleAlign: 'center',cardStyleInterpolator: (Platform.OS==='ios' ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forBottomSheetAndroid)}}/>
                <Stack.Screen name="Resume" component={Resume}
                options={{title: '이력서', headerTitleAlign: 'center', headerTitleStyle:{fontSize: 28}}}  />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const MainNavigation = ({navigation}) => {
    return (
        <Tab.Navigator sceneContainerStyle={{backgroundColor:undefined}} screenOptions={{
            headerRight : (props) => (
                <TouchableOpacity style={{marginRight:wp('4%')}} {...props} activeOpacity={0.7} onPress={()=>{navigation.navigate("Notification")}}>
                    <Ionicons name="notifications-outline" size={30} color="black" />
                </TouchableOpacity>),
            headerTitleStyle:{fontSize: 30, marginBottom:hp('1%'), marginLeft:wp('1%')}, headerStatusBarHeight:hp('5%'),
            tabBarActiveTintColor: '#003366', tabBarInactiveTintColor: '#a7a9ac',
            tabBarStyle:{ height: hp('8.5%'), paddingTop:hp('0.5%'), paddingBottom:hp('1%')},
        }}>
            <Tab.Screen name="Home" component={HomeNavigation}
            options={{ title: '홈', tabBarIcon: ({color, size}) => <Octicons name="home" size={24} color={color} />,
            headerTitle: '명지캠프', headerStyle:{backgroundColor:'#ffffff'}}}/>
            <Tab.Screen name="Scrap" component={Scrap}
            options={{ title: '스크랩', tabBarIcon: ({color, size}) => <Feather name="bookmark" size={24} color={color} />}}/>
            <Tab.Screen name="PostButton" component={PostButton}
            options={{ title: '글쓰기', tabBarIcon: ({color, size}) => <AntDesign name="pluscircle" size={34} color={'#003366'} />,
            tabBarButton: (props) => (<TouchableOpacity activeOpacity={0.7} {...props} onPress={()=>{navigation.push('Post');}}/>), tabBarLabelStyle: {display: 'none'}}}/>
            <Tab.Screen name="Apply" component={Apply}
            options={{ title: '지원현황', tabBarIcon: ({color, size}) => <FontAwesome5 name="folder-open" size={24} color={color} />}}/>
            <Tab.Screen name="MyPage" component={MyPage}
            options={{ title: '마이페이지', tabBarIcon: ({color, size}) => <Octicons name="person" size={24} color={color} />}}/>
        </Tab.Navigator>
    )
}

const HomeNavigation = () => {
    return (
        <></>
    )
}

export default Navigation;