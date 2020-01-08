import React, {Fragment} from 'react';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Fragment>
                <h1>404</h1>
                <h3>Not Found</h3>
            </Fragment>
        )
    }
}

export default NotFound;