import { connect } from 'react-redux';
import { setImportDialogVisible } from '../../actions';
import Header from './Header';

const mapDispatchToProps = {
    setImportDialogVisible
};

export default connect(null, mapDispatchToProps)(Header);
