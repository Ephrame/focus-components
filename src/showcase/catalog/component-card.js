//dependencies
const React = require('react');
const {Component} = React;
const types = require('focusjs').component.types;
const liStyle = { flex: 1, minWidth: '20%', marginTop: '7px', marginRight: '7px'};

/**
 * Component describing a component.
 */
class ComponentCard extends Component{
    constructor(props){
        super(props);
    }
    /** @inheriteDoc */
    render() {
        const {name, description, example, photo, keywords} = this.props;
        const style = {background: `url('${photo}') bottom right  no-repeat #46B6AC`, height: '320px'};
        return (
                <li className='demo-card-wide mdl-card mdl-shadow--2dp' style={liStyle}>
                <div className='mdl-card__title' style={style}>
                    <h2 className='mdl-card__title-text'>{name}</h2>
                    </div>
                    <div className='mdl-card__supporting-text'>
                        {description}
                        <div className='tags'>
                          {keywords.slice(0, 2).map((tag) => <button className='mdl-button mdl-js-button mdl-js-ripple-effect'>{tag}</button>)}
                        </div>
                    </div>
                    <div className='mdl-card__actions mdl-card--border'>
                        <a className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' href={example} onClick={this.props.showLiveComponent}>
                          Example
                        </a>
                        </div>
                    <div className='mdl-card__menu'>
                        <button className='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>
                          <i className='material-icons'>share</i>
                        </button>
                    </div>
                </li>
        );
    }
}

//Static props.
ComponentCard.displayName = 'ComponentCard';
ComponentCard.defaultProps = {};
ComponentCard.propTypes = {
    description: types('string'),
    example: types('string'),
    url: types('string'),
    keywords: types('string'),
    photo: types('string'),
    name: types('string')
};

module.exports = ComponentCard;
