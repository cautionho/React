import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from '@/redux/Store'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import {createHashHistory } from 'history'

alert(123);

(window as any).apiready = function(){
  ReactDOM.render(<Provider store={Store}><Router history={createHashHistory()}><App /></Router></Provider>, document.getElementById('root'));
}
