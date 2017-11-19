import { connect } from 'react-redux';
import { setImportDialogVisible } from '../../actions';
import Wizard from './Wizard';

const mapStateToProps = (state, ownProps) => ({
    visible: state.importDialogVisible
});

const mapDispatchToProps = {
    setImportDialogVisible
};

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
