import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CreatePodcast from './pages/CreatePodcast';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={CreatePodcast} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;