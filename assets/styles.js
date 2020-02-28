import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: '#fff',
  },
  input: {
  
    borderBottomWidth: 1,
    height:'83%',
    borderColor: '#000',
    marginHorizontal:5,
    width: '45%'

  },
  inputRow: {
    width: "100%",
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:'center'
  },
  card:{
    width:'90%',
    alignItems:'center',
    borderColor:'black',
    justifyContent:'space-around',
    borderBottomWidth:1,
    flexDirection: 'row',
  },
  signUpText: {
    fontSize: 20,
    marginVertical: 30,
    textAlign: 'center',
    textDecorationLine:'underline'
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  
  },
  loginButton: {
    backgroundColor: 'lightblue',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
});