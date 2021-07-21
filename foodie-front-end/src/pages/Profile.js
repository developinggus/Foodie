import React, { useContext, Component, useEffect, useState, Suspense } from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity, View, Modal, Pressable, PixelRatio } from 'react-native';
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, AuthProvider } from '../context';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { CommentContext, CommmentProvider } from "./../context/"
import { RestaurantContext, RestaurantProvider } from "./../context/"
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { render } from 'react-dom';

export default (props) => {
    const width = useWindowDimensions.width;
    const height = useWindowDimensions.height;
    const userContext = useContext(AuthContext);
    const commentContext = useContext(CommentContext);
    const restaurantContext = useContext(RestaurantContext);
    const [userName, setUserName] = useState("");
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    var [comments, setComments] = useState([]);
    const [friendslist, setFriendsList] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    var [parent, setParent] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [friendsVisible, setFriendsVisible] = useState(false);
    const [userListVisible, setUserListVisible] = useState(false);
    const [buttonsVisible, setButtonsVisible] = useState(false);
    const [viewVisible, setViewVisible] = useState(false);
    const display = buttonsVisible ? "none" : "flex";
    const display2 = viewVisible ? "none" : "flex";
    const [selectedId, setSelectedId] = useState(null);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [dictionary, setDictionary] = useState({});
    const [commentsToShow, setCommentsToShow] = useState([]);
    const [userList, setUserList] = useState([]);

    //function to get
    function get_font_size(size) {
        return size / PixelRatio.getFontScale();
    };

    async function getMyData() {
        setViewVisible(true);
        var username
        try {
            username = await AsyncStorage.getItem('userName');
            commentContext.setPoster(username);
            setUserName(username);
        } catch (error) {
            console.log(`Failed to get username: ${error}`);
            throw ("Failed to get auth username");
        }
       
        try {
            commentContext.setContent('');
            const mycomments = await commentContext.findComments(username);
            console.log(await commentContext.state.comments)
            setComments(mycomments);
        } catch (e) {
            console.log(`No comments to load: ${e}`);
        }
        updateRestaurants();
        getFriendsList();
        getUserList();
        loadComments();
    }

    useEffect(() => {
        (async () => {
            await getMyData();
        })();
        //[] indicates that this is loads/unloads once and will not continuously update
    }, [])

    const updateRestaurants = async function () {
            const myrestaurants = await restaurantContext.findRestaurant();
            var dict = {};
            commentContext.setRestaurant('null');
            console.log(myrestaurants);
            setRestaurants(myrestaurants);
            //make a dictionary here to map out _ids to names
            for (let k = 0; k < myrestaurants.data.length; k++) {
                dict[myrestaurants.data[k]._id] = myrestaurants.data[k].name
            }
            setDictionary(dict);
    }

    const getUserList = async function () {
        const users = await userContext.findUsers();
        console.log(users)
        setUserList(users);
    }

    const getFriendsList = async function () {
        username = await AsyncStorage.getItem('userName');
        userContext.setUserName(username);
        myinfo = await userContext.getUserInfo(username);
        setFriendsList(myinfo.data[0].friends)
        console.log(myinfo.data);
        console.log(myinfo.data[0].friends)

    }

    const loadComments = function () {
        var newcomment;
        var commentlist = [];
        var visiblename;
        var count = 0
        try {

            for (let i = 0; i < comments.data.length; i++) {
                var newposter = comments.data[i].poster
                console.log(newposter);
                var newcontent = comments.data[i].content
                console.log(newcontent);
                var newrest = comments.data[i].restaurant
                console.log(newrest)
                if (newrest != 'null') {
                    visiblename = dictionary[newrest];
                }
                else {
                    visiblename = ''
                }

                count++
                newcomment = <View key={count} style={styles.commentview}>
                    <Text style={{ alignSelf: "center", marginTop: 3, marginBottom: 2, fontWeight: "bold", fontFamily: "Georgia" }}>{visiblename}</Text>
                    <Text style={{ marginTop: 3, }}>{newcontent} {"\n"}</Text></View>

                commentlist.push(newcomment);
            }
            return commentlist;
        } catch (error) {
            console.log(`Failed to load poster/content: ${error}`);
        }
    }

    const addComments = async function () {
        try {
            commentContext.addParentComment()
        } catch (error) {
            console.log(`Failed to add comment: ${error}`);
        }
    }

    const getItem = (item) => {
        commentContext.setRestaurant(item._id)
        alert(' Restaurant : ' + item.name + '\n' + ' Address : ' + item.address);
    };

    //this function defines the actions when a user clicks an item in the restaurant flatlist
    const ItemView = ({ item }) => {
        const bgcolor = item._id === selectedId ? "#f6b7ff" : "#aedbff";
        return (
            // Flat List Item
            <Text style={styles.itemStyle, { backgroundColor: bgcolor, fontSize: get_font_size(15), padding: 5 }}
                onPress={() => { getItem(item); setSelectedId(item._id); }}>
                {item.name.toUpperCase()}
            </Text>
        );
    };
    //this function defines the acions when a user clicks on a friends in the friendslist
    const FriendView = ({ item }) => {
        const bgcolour = item == selectedFriend ? "#f6b7ff" : "#aedbff";
        return (
            //Flat List Item
            <Text style={styles.itemStyle, { backgroundColor: bgcolour, fontSize: get_font_size(15), padding: 5 }}
                onPress={() => { setSelectedFriend(item); console.log(item); console.log(typeof (item)); }}>
                {item}
            </Text>
        );
    };

    const userView = ({ item }) => {
        const bgcolour = item == selectedUser ? "#f6b7ff" : "#aedbff";
        return (
            //Flat List Item
            <Text style={styles.itemStyle, { backgroundColor: bgcolour, fontSize: get_font_size(15), padding: 5 }}
                onPress={() => { setSelectedUser(item); console.log(item); }}>
                {item.userName}
            </Text>
        );
    };


    async function viewFriends() {
        if (selectedFriend) {
            setFriendsVisible(!friendslist);
            setComments(await commentContext.findComments(selectedFriend));
            setUserName(selectedFriend);
            setButtonsVisible(true);
        }
        else {
            alert('must select a friend');
        }

    }

    async function addFriend() {
        await userContext.addFriend(userName, selectedUser.userName)
    }

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: 'white',
                }}
            />
        );
    };

    const searchFilterFunction = (text) => {
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.data.filter(function (item) {
                const itemData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase();
                console.log(itemData);
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            console.log(newData);
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    }

    const searchUserFilterFunction = (text) => {
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.data.filter(function (item) {
                const itemData = item.userName
                    ? item.userName.toUpperCase()
                    : ''.toUpperCase();
                console.log(itemData);
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            console.log(newData);
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    }

    const logOut = async () => {
        await AsyncStorage.removeItem('token')
        props.navigation.navigate('sign in')
    }


    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            padding: 5,
            alignItems: "center",
        },
        backButton: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            backgroundColor: 'pink',
        },
        modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            //alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        button: {
            borderRadius: 20,
            padding: 10,
            margin: 3,
            alignSelf: "center",
            alignContent: 'center'
        },
        buttonOpen: {
            backgroundColor: "#F194FF",
        },
        buttonClose: {
            backgroundColor: "#2196F3",
        },
        buttonLogOut: {
            backgroundColor: "grey"
        },
        contentinput: {
            fontSize: get_font_size(17),
            flexDirection: "column",
            alignContent: "center",
            alignSelf: "center",
            maxHeight: 100,
            borderColor: "#000",
            borderWidth: 1,
            marginTop: 15,
            padding: 20,
            width: "100%",
            borderRadius: 15
        },
        basicview: {
            flex: 1,
            padding: 4
        },
        commentview: {
            backgroundColor: "white",
            flex: 1,
            padding: 5,
            marginVertical: 8,
            marginBottom: 8,
            justifyContent: "space-between",
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
        },
        userview: {
            marginBottom: 10,
            borderBottomWidth: 10,
            borderBottomColor: "black",
            borderWidth: 5,
            padding: 10,
            width: "75%",
        },
        itemStyle: {
            padding: 10,
        },
        name: {
            fontSize: 30,
            fontFamily: 'Georgia'
        },
        commentParent: {
            height: "70%",
            width: "80%",
            padding: 5,
        },
        title: {
            fontSize: get_font_size(40),
            color: "#66aaffff",
            fontWeight: "bold",
            textAlign: "center",
            textAlignVertical: "bottom",
        },
    });

    return (
        <SafeAreaView style={styles.screen}>
            <View stlye={styles.userview}>
                <Text adjustsFontSizeToFit style={styles.title}>{userName}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center", marginBottom: "1%" }}>
                <Pressable
                    style={{ padding: 7, alignSelf: 'center', borderRadius: 20, margin: 3, backgroundColor: "#F194FF" }}
                    onPress={() => { getFriendsList(); setFriendsVisible(true); }}>
                    <Text>Friends List</Text>
                </Pressable>
                <Pressable
                    style={{ padding: 7, alignSelf: "center", borderRadius: 20, margin: 3, backgroundColor: "#F194FF", display: display2 }}
                    onPress={() => { getMyData(); setButtonsVisible(false); }}>
                    <Text>My Profile</Text>
                </Pressable>
                <Pressable
                    style={{ padding: 7, alignSelf: 'center', borderRadius: 20, margin: 3, backgroundColor: "#F194FF" }}
                    onPress={() => { setMasterDataSource(userList); setFilteredDataSource(userList); setUserListVisible(true); }}>
                    <Text>Find a Friend</Text>
                </Pressable>
            </View>

            <ScrollView
                style={styles.commentParent}>{loadComments()}</ScrollView>

            <View>
                <Modal animationType="slide"
                    transparent={true}
                    visible={friendsVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!friendsVisible);
                    }}>
                    <View style={styles.modalView}>
                        <Text style={{ alignSelf: "center", fontSize: get_font_size(17), fontWeight: "bold" }}>Go to a friends page!</Text>
                        <FlatList
                            data={friendslist}
                            ItemSeparatorComponent={ItemSeparatorView}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={FriendView}>
                        </FlatList>
                        <View style={{ flexDirection: "row", alignSelf: "center", padding: 4, marginTop: 10 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => { setSelectedFriend(null); viewFriends(); setViewVisible(false); }}>
                                <Text>Checkout Friend</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => { setFriendsVisible(!friendslist); }}>
                                <Text>Go Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>

            <View>
                <Modal animationType="slide"
                    transparent={true}
                    visible={userListVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!userListVisible);
                    }}>
                    <View style={styles.modalView}>
                        <Text style={{ alignSelf: "center", fontSize: get_font_size(17), fontWeight: "bold" }}>Search for a friend</Text>
                        <SearchBar style={styles.searchbar}
                            containerStyle={{ backgroundColor: "white", borderRadius: "15" }}
                            inputStyle={{ backgroundColor: "white" }}
                            searchIcon={{ size: 18 }}
                            onChangeText={(text) => searchUserFilterFunction(text)}
                            onClear={(text) => searchUserFilterFunction('')}
                            placeholder="Find a friend"
                            value={search}>
                        </SearchBar>
                        <FlatList
                            data={filteredDataSource}
                            ItemSeparatorComponent={ItemSeparatorView}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={userView}>
                        </FlatList>
                        <View style={{ flexDirection: "row", alignSelf: "center", padding: 4, marginTop: 10 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => { addFriend(); setUserListVisible(!userListVisible); }}>
                                <Text>Add Friend</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => { getMyData(); setUserListVisible(!userListVisible); }}>
                                <Text>Go Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>


            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}>
                    <View>
                        <View style={styles.modalView}>
                            <Text style={{ alignSelf: "center", fontSize: get_font_size(17), fontWeight: 'bold' }}>Post a comment on your profile!</Text>
                            <SearchBar style={styles.searchbar}
                                containerStyle={{ backgroundColor: "white", borderRadius: "15" }}
                                inputStyle={{ backgroundColor: "white" }}
                                searchIcon={{ size: 18 }}
                                onChangeText={(text) => searchFilterFunction(text)}
                                onClear={(text) => searchFilterFunction('')}
                                placeholder="Find a restaurant"
                                value={search}>
                            </SearchBar>
                            <FlatList
                                data={filteredDataSource}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={ItemSeparatorView}
                                renderItem={ItemView}>
                            </FlatList>
                            <TextInput
                                multiline
                                onChangeText={(text) => commentContext.setContent(text)}
                                style={styles.contentinput} placeholder="Write your comment here"
                                autoCapitalize='none' />
                            <View style={{ flexDirection: "row", alignSelf: "center", padding: 4, marginTop: 10 }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => { setModalVisible(!modalVisible); getMyData(); setSelectedId(null); }}>
                                    <Text>Go Back</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => { addComments(); setModalVisible(!modalVisible); setSelectedId(null); getMyData(); }}>
                                    <Text>Add Comment</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center", marginBottom: "1%", display }}>
                <TouchableOpacity style={[styles.button, styles.buttonLogOut]} onPress={() => logOut()}>
                    <Text>
                        Sign Out
                    </Text>
                </TouchableOpacity>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => { updateRestaurants(); setModalVisible(true); setMasterDataSource(restaurants); setFilteredDataSource(restaurants); }}>
                    <Text>Add a comment</Text>
                </Pressable>
            </View>



        </SafeAreaView>
    )
}