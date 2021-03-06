import TranslationBehaviour from '../';
import React from 'react';
import i18n from 'i18next';

describe('The translation behaviour', () => {
    let renderedComponent;
    before((done) => {
        i18n.init({}, () => {
            @TranslationBehaviour
            class TestComponent extends React.Component {
                render() {
                    return (
                        <div>
                            {this.i18n('my.translation.path')}
                        </div>
                    );
                }
            }
            renderedComponent = TestUtils.renderIntoDocument(<TestComponent/>);
            done();
        });
    });
    it('should add the translation function to the provided component', () => {
        const child = TestUtils.findRenderedDOMComponentWithTag(renderedComponent, 'div');
        expect(React.findDOMNode(child).innerHTML).to.equal('my.translation.path');
    });
});
