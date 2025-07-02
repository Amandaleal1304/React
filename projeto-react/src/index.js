// arquivo principal onde carrega o html e o app e jogar um dentro do outro 
import {createRoot} from 'react-dom/client';
import App from './app';

const rootEl = document.getElementById('root');
const rootApp = createRoot(rootEl);
rootApp.render(<App/>);
