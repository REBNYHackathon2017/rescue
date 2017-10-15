import React, {Component, PropTypes} from 'react';

export default class Detail extends Component {
    static propTypes = {
        params: React.PropTypes.object, // from react router
    };

    componentWillMount() {
        console.log(this.props.params.id);
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}