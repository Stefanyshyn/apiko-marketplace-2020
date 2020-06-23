import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import {
  ViewerOperations,
  ViewerSelectors,
} from '../../../models/viewer';

import EditProfileComponent from './EditProfileComponent';
import confirm from 'reactstrap-confirm';

const mapStateToProps = (state) => {
  return {
    user: ViewerSelectors.getCurrentUser(state),
    fetchViewer: state.viewer.fetchViewer,
  };
};

const mapDispatchToProps = {
  putUser: ViewerOperations.putViewer,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onSubmit: (props) => async (body) => {
      let result = await confirm({
        message: 'Edit data?',
        confirmText: 'Confirm',
        confirmColor: 'warning',
        cancelColor: 'link text-danger',
      });
      if (result) {
        await props.putUser(body);
      }
    },
    onUpdatePhoto: () => (setFieldValue, setTouched) => (event) => {
      event.preventDefault();
      const select = document.createElement('input');
      select.setAttribute(
        'accept',
        '.jpg,.jpeg,.png,.gif,.apng,.tiff,.tif,.bmp,.xcf,.webp,.mp4,.mov',
      );
      select.type = 'file';
      select.onchange = async (e) => {
        let file = e.target.files[0];
        setFieldValue('avatar', URL.createObjectURL(file));
        setFieldValue('newAvatar', file);
        setTouched('avatar');
      };
      select.click();
    },
  }),
);
export default enhance(EditProfileComponent);
