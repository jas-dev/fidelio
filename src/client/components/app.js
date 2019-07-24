import React from 'react';
import '../assets/css/app.scss';
import AddQuestion from './addQuestion'


class App extends Component {
    state = {
        questions: [],
        error: ''
    };

    async getStudentData(){
        try{
            const response = await axios.get('/api/questions');
            this.setState({
                questions: response.data.data
            });
        }catch(err){
            this.setState({
                error: 'Error retrieving student data'
            });
        }
    };
    render(){
        return (
            <div>
                <h1 className="center">fidelio</h1>
                <h5 className='red-text text-darken-2'>{this.state.error}</h5>
                <div className="row">

                </div>
            </div>
        );
    };
}

export default App;