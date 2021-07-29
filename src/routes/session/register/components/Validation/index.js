import moment from 'moment'


export const EmailValidator= (e) =>{
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailState  = ''
    if (emailRex.test(e)) {
        emailState = 'has-success'
    } else {
        emailState = 'has-danger'
    }
    return emailState
}


export const PasswordValidator = (password, repassword) => {
    let passwordState  = ""
    if (password === repassword) {
      passwordState = 'has-success'
    } else {
      passwordState = 'has-danger'
    }
    return passwordState
} 


export const StepperZeroValidator = (props, emailState, passwordState) => {
    const {companyInfo, userInfo } = props

    if (userInfo.firstName.length < 3) {
        return [false, 'Please input a valid first name']
    }

    if (userInfo.lastName < 3) {
        return [false, 'Please input a valid last name']
    }
       
   if (companyInfo.name.length < 3) {
        return [false, 'Please input a valid company name']
   }
  
   if (emailState !== "has-success") {
        return [false, 'Please input a valid email address']
   }

   if (passwordState !== "has-success") {
    return [false, 'Please check your password again']
   }

   return [true, '']
} 


export const CheckCreditCard = (props) => {
  
    if (props.payment_name.length < 4) {
        return [false, 'Please input name of the card']
    }

    if (props.payment_no.length != 25) {
        return [false, 'Please input 16 digits credit card number']
    }

    const splitNumber = props.payment_expiry.split('/')

    if (splitNumber == "") {
        /*
        * if no input for expiry return false
        */
        return [false, 'Please input a valid expire date for your card']

    } else {
        if (!splitNumber.some(isNaN)) {
            if (moment(props.payment_expiry, 'MM/YY').isBefore(moment())) {
                return [false, 'Your card has expired, please input another credit card']
            } 
        } else {
            /*
             * incomplete expiry date, return false
            */
            return [false, ' Please input a valid expire date for your card']
        }
    }
    
    if (props.payment_code == "") {
        return [false, 'Please input valid CVC digits']
    } else {
        /*
         * check if can be divided
        */
        if(!(Number(props.payment_code) % 1 === 0)){
            return [false, 'input valid CVC digits']
        }    
    }
 
    return [true, '']
} 

