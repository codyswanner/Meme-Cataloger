import renderer from 'react-test-renderer';
import TopAppBar from './TopAppBar';


describe('TopAppBar', () => {
    test('snapshot', () => {
        const tree = renderer
            .create(<TopAppBar/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
