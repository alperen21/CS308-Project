import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#BFA38F'
  },
  container: {
		shadowColor: '#cdcdcd',
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 5,
		marginBottom: 30,
	},
	image: { width: 100, height: 100, marginTop: 10 },
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	title: { fontSize: 23, fontWeight: 'bold' },
	description: { color: '#b1b1b1', marginBottom: 10 },
	price: {
		color: '#7de3bb',
		fontSize: 18,
		fontWeight: 'bold',
	},
	notInStock: { textAlign: 'center' },

	together: {

		flexDirection: 'row',
		justifyContent: 'space-evenly',

	},
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
	input: {
		height: 30,
		width: 25,
		margin: 1,
		borderWidth: 0.3,
		fontSize: 15,
		textAlign: 'center'
	},
	button: {
		backgroundColor: '#000000bf',
		borderRadius: 20,
		paddingHorizontal: 13,
		paddingVertical: 12,
		marginTop: 20
	},
	buttontext: {
		color: '#ffffff',
		textAlign: 'center',
		fontSize: 15,
		fontWeight: '500',
	},
  textInput: {
    flex: 1,
    
    paddingLeft: 10,
    color: '#05375a',
},
}));
