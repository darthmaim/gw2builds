import { connect } from 'react-redux';
import { removeImportApiKey } from '../../actions';
import Overview from './Overview';
import loadBuild from './loadBuild';

const mapStateToProps = (state, ownProps) => ({
    apiKeys: state.importApiKeys
});

const mapDispatchToProps = (dispatch) => ({
    removeImportApiKey: (key) => dispatch(removeImportApiKey(key)),
    loadBuild: loadBuild(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
