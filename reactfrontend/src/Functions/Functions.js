

export const handleChange = (event) => {
  this.setState({
    word: event.target.value,
    error: ''
  });
}
export const validateWordAPI = async (event) => {
    event.preventDefault();
    const word = event.target[0].value;
    // if(word){
        const key = 'dict.1.1.20200319T090129Z.8eb6b755e125a705.7fd9b9cb85a09a0dd9c47a86bb564c856893cafc';
        const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-ru&text=${word}`);
        const data = await response.json();
        if(data){
          if(this.validate(word) === true ) {
              this.setState({error: ''});
              this.setState(previousState => ({
              approvedWords: [...previousState.approvedWords, word]}));
              this.setState({word: ''});
          }
          else {
              this.setState({error: 'invalid!!'});
              this.setState({word: ''});
          }
        }
        else {
            this.setState({error: 'invalid!!'});
            this.setState({word: ''});
        }
  // }
  // else {
  //   this.setState({error: 'enter a word!'});
  // }
  }

  export const validateWordAPI_test = async (word) => {
    if(word){
        const key = 'dict.1.1.20200319T090129Z.8eb6b755e125a705.7fd9b9cb85a09a0dd9c47a86bb564c856893cafc';
        const response = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-ru&text=${word}`);
        const data = await response.json();
        if(data){
          if(this.validate(word) === true ) {
              this.setState({error: ''});
              this.setState(previousState => ({
              approvedWords: [...previousState.approvedWords, word]}));
              this.setState({word: ''});
          }
          else {
              this.setState({error: ''});
              this.setState({word: ''});
          }
        }
        else {
            this.setState({error: 'invalid!!'});
            this.setState({word: ''});
        }
  }
  else {
    this.setState({error: 'enter a word!'});
  }
  }


export const validate = (word) => {
    const board = this.state.board;
    const currentWord = word.toLowerCase();

    if(this.state.approvedWords.includes(currentWord))
      return false;
      for(let i=0;i<board.length;i++){
          for(let j=0;j<board[0].length;j++){
              if(board[i][j].toLowerCase() === currentWord[0]){
              if(this.depthFirstSearch(i, j, board, currentWord))
              return true;
            }
          }
      }
    return false;
  }
