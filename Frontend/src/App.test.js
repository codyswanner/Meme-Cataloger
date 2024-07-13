import renderer from 'react-test-renderer';
import App from './App';


describe('App', () => {
    test('snapshot', () => {
        // Will not actually be checked in this test
        const mockApiData = [
            [], [], []
        ]
        
        const tree = renderer
            .create(<App apiData={mockApiData}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
