import React, {ComponentClass} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {loadItemAction} from "../../utils/redux/actions/items";
import UniversalCenteredLoader from "../UniversalCenteredLoader";

function withEntityData(WrappedComponent: any, selectData?: any) {



    class WithEntityData extends React.Component<{items: any, itemId: number} & ComponentClass> {
        constructor(props: any) {
            super(props);
            props.loadItemAction(props.itemId);
        }

        componentDidMount() {
        }

        componentWillUnmount() {
        }

        render() {
            const {items, itemId} = this.props;

            return (
                items && items[itemId] ?
                    <WrappedComponent item={items[itemId]} {...this.props}/> :
                    <UniversalCenteredLoader/>
            )
        }
    }

    const mapStateToProps = (state: any) => ({
        items: state.items && state.items.items
    })

    return compose(
        connect(mapStateToProps,{loadItemAction})
    )(WithEntityData);
}

export default withEntityData;