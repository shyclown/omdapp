import React, {ComponentClass} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {loadItemAction} from "../../utils/redux/actions/items";
import UniversalCenteredLoader from "../UniversalCenteredLoader";

interface IProps {
    items: any,
    itemId: number,
    single?: boolean | undefined,
    page?: boolean | undefined,
}

function withEntityData(WrappedComponent: any, selectData?: any) {

    class WithEntityData extends React.Component<IProps & ComponentClass> {
        constructor(props: any) {
            super(props);
            props.loadItemAction(props.itemId);
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