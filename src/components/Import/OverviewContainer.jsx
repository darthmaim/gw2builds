import { connect } from 'react-redux';
import { removeImportApiKey } from '../../actions';
import Overview from './Overview';

const mapStateToProps = (state, ownProps) => ({
    apiKeys: state.importApiKeys
});

const mapDispatchToProps = {
    removeImportApiKey
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
