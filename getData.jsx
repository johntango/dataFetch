function App() {
  const { Container } = ReactBootstrap;
  const [data, setData] = React.useState({ hits: [] });
  const [query, setQuery] = React.useState("redux");
  const [url, setUrl] = React.useState(
    // "https://hn.algolia.com/api/v1/search?query=redux"
    "http://localhost:8080/data.json"
  );
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios(url);

      setData(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
    <Container>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() => setUrl("http://localhost:8080/data.json")}
      >
        Search
      </button>

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
