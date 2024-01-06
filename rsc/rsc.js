const ReactDOMServer = require('react-dom/server');

const renderComponent = async (componentPath) => {
  try {
    const componentModule = require(componentPath);
    const ComponentFunc = componentModule.default;

    if (typeof ComponentFunc !== 'function') {
      throw new Error('ComponentFunc is not a function');
    }

    const element = await ComponentFunc();
    return ReactDOMServer.renderToString(element);
  } catch (error) {
    return `<div>Error: ${error.message}</div>`;
  }
};

const componentPath = process.argv[2];

renderComponent(componentPath)
  .then(html => console.log(html))
  .catch(error => console.error(error));
