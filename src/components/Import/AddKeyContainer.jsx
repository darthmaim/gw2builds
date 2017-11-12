import { connect } from 'react-redux';
import { addImportApiKey } from '../../actions';
import AddKey from './AddKey';

const mapDispatchToProps = {
    addImportApiKey
};

export default connect(null, mapDispatchToProps)(AddKey);
