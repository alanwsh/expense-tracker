import { View, StyleSheet, Text} from 'react-native';
import { useState } from 'react';
import Input from './Input';
import Button from '../../components/UI/Button';
import {formatDate} from '../../utils/date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}){
    const [input, setInput] = useState({
        amount: {
            value : defaultValues ? defaultValues.amount.toString() : '',
            isValid : true
        },
        date: {
            value : defaultValues ? formatDate(defaultValues.date) :'',
            isValid : true
        },
        description: {
            value : defaultValues ? defaultValues.description : '',
            isValid : true
        }
    });

    function inputChangeHandler(inputIdentifier, enteredValue){
        setInput((curInputs)=>{
            return {
                ...curInputs,
                [inputIdentifier]: { value : enteredValue, isValid : true}
            }
        });
    }

    function submitHandler(){
        const expenseData = {
            amount: +input.amount.value,
            date: new Date(input.date.value),
            description: input.description.value
        }
        
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if( !amountIsValid || !dateIsValid || !descriptionIsValid){
            setInput((cur) => {
                return {
                    amount : { value: cur.amount.value , isValid : amountIsValid },
                    date : { value: cur.date.value , isValid : dateIsValid },
                    description : { value: cur.description.value , isValid : descriptionIsValid }
                }
            });
        }else{
            onSubmit(expenseData);
        }     
    }
    const formIsInvalid = !input.amount.isValid || !input.date.isValid || !input.description.isValid;

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense Item</Text>
        <View style={styles.inputsRow}>
            <Input style={[styles.rowInput]} label="Amount" invalid={!input.amount.isValid} textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this, 'amount'),
                value: input.amount.value
            }}/>
            <Input style={styles.rowInput} label="Date" invalid={!input.date.isValid} textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: input.date.value
            }}/>
        </View>
        <Input label="Description" invalid={!input.description.isValid} textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: input.description.value
        }}/>
        {
            formIsInvalid && (
                <Text style={styles.errorText}>Input Is Invalid</Text>
            )
        }
        <View style={styles.buttonContainer}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
    </View>
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form:{
        marginTop:40
    },
    inputsRow:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput:{
        flex:1
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color:'white',
        marginVertical: 24,
        textAlign:'center'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:8
    },
    button:{
    minWidth:120,
    marginHorizontal:8
    },
    errorText:{
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
});