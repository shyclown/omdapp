import React, {ComponentClass} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {loadItemAction} from "../../utils/redux/actions/items";
import UniversalCenteredLoader from "../UniversalCenteredLoader";

function withEntityData(WrappedComponent: any, selectData?: any) {

    class WithEntityData extends React.Component<{items: any, itemId: number, perex?: boolean} & ComponentClass> {
        constructor(props: any) {
            super(props);
            console.log(props);
            props.loadItemAction(props.itemId);
        }

        render() {
            const {items, itemId} = this.props;
            console.log(this.props);

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