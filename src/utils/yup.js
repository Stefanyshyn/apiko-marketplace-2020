import * as yup from 'yup';

function equalTo(ref, msg) {
  return yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    // eslint-disable-next-line no-template-curly-in-string
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test: function (value) {
      return value === this.resolve(ref);
    },
  });
}
yup.addMethod(yup.string, 'equalTo', equalTo);

export default yup;
