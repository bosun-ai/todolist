// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/**
 * This file configures the global testing environment for the React application.
 * 
 * By importing `@testing-library/jest-dom` at a global level, it extends Jest's
 * native assertion capabilities with custom matchers, making it easier to write
 * expressive and readable tests for DOM elements. This is particularly useful
 * in the context of a to-do list application, where testing the UI and its
 * interactions is crucial.
 * 
 * The custom matchers provided by `@testing-library/jest-dom` allow for more
 * precise assertions on the state and presence of DOM nodes, enhancing the
 * testing experience by enabling assertions like `toBeInTheDocument()` or
 * `toHaveTextContent()`. This global import ensures that these matchers are
 * available in all test files without the need for individual imports, streamlining
 * the setup process and improving test maintainability.
 * 
 * Example Usage:
 * ```typescript
 * // In a test file
 * test('renders a greeting message', () => {
 *   render(<Greeting />);
 *   const greetingElement = screen.getByText(/hello/i);
 *   expect(greetingElement).toBeInTheDocument();
 * });
 * ```
 * 
 * This setup is instrumental in facilitating effective testing practices within
 * the application, particularly for verifying the functionality and user interface
 * of the to-do list components.
 */