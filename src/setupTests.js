// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

['backdrop-root', 'overlay-root'].forEach((id) => {
  if (!document.getElementById(id)) {
    const portalRoot = document.createElement('div');
    portalRoot.id = id;
    document.body.appendChild(portalRoot);
  }
});
