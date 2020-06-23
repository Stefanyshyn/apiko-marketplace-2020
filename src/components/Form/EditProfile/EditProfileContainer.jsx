import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { ViewerOperations } from '../../../models/viewer';

import EditProfileComponent from './EditProfileComponent';
import confirm from 'reactstrap-confirm';
import upload from '../../../service/api/upload';

const mapStateToProps = (state, props) => {
  return {
    ...state.viewer.fetchViewer,
    user: state.viewer.user,
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
    onUpdatePhoto: (props) => (setFieldValue, setTouched) => (
      event,
    ) => {
      event.preventDefault();
      const select = document.createElement('input');
      select.setAttribute(
        'accept',
        '.jpg,.jpeg,.png,.gif,.apng,.tiff,.tif,.bmp,.xcf,.webp,.mp4,.mov',
      );
      select.type = 'file';
      select.onchange = async (e) => {
        let file = e.target.files[0];
        await upload.image(file);
        setFieldValue('avatar', URL.createObjectURL(file));
        setFieldValue('newAvatar', file);
        setTouched('avatar');
      };
      select.click();
    },
  }),
);
export default enhance(EditProfileComponent);
