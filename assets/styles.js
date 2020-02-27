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
    borderBottomWidth:1,
    
    flexDirection: 'row'
  }
});