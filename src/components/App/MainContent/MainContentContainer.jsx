import { connect } from 'react-redux';
import { setImportDialogVisible } from '../../../actions';
import MainContent from './MainContent';

const mapDispatchToProps = {
    setImportDialogVisible
};

export default connect(null, mapDispatchToProps)(MainContent);
