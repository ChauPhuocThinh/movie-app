import './App.scss';
import Admin from './components/admin'
import Member from './components/member';
function App() {
  if (window.location.href.includes('admin')){
    return (
      <Admin/>
    );
  }else{
    return (
      <Member/>
    );
  }
  
}

export default App;
