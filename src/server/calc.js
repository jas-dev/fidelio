

function do_math( num1, operator, num2){
    console.log("do_math has been called");
    var result = null;
    switch(operator){
        case '+':
            result = num1+num2;
            break;
        case '-':
            result = num1-num2;
            break;
        case 'x':
            result = num1*num2;
            break;
        case '/':
            result = num1/num2;
            break;
        default:
            break;
    }
    if(result === Infinity ){
        return "Error";
    }
    return result;
}
var n1 = parseInt(process.argv[2]);
var op = process.argv[3];
var n2 = parseInt(process.argv[4]);

console.log(process.argv);
var answer = do_math(n1,op,n2);

console.log("answer "+answer);

