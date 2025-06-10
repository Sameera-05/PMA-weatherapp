import React from 'react';

const articles = [
  {
    title: "Tornado Hits Oklahoma",
    url: "https://www.nhc.noaa.gov/",
    date: "June 3, 2024",
  },
  {
    title: "Severe Flooding in Germany",
    url: "https://www.bbc.com/news/world-europe-60547242",
    date: "June 1, 2024",
  },
  {
    title: "Cyclone Remal Lashes Bangladesh",
    url: "https://www.nhc.noaa.gov/",
    date: "May 27, 2024",
  },
];

const RecentEvents = () => {
  return (
    <div className="row">
      {/* LEFT SIDE */}
      <div className="col-md-6 mb-4">
        <div className="card p-4 shadow-sm border-0">
          <h4>🌍 Recent Weather Highlights</h4>
          <p>
            The past few weeks have seen an uptick in extreme weather events globally.
            From tornadoes in the U.S. to cyclones in South Asia, the planet continues
            to experience climate-induced disruptions. Stay informed and stay safe. 💡
          </p>
          <p>
            Below are some real-world articles highlighting these events with more details.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="col-md-6">
        <div className="card p-4 shadow-sm border-0">
          <h4>📰 Articles & News</h4>
          <ul className="list-unstyled">
            {articles.map((item, index) => (
              <li key={index} className="mb-3">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="fw-semibold text-decoration-none">
                  📌 {item.title}
                </a>
                <div className="text-muted" style={{ fontSize: '0.9em' }}>{item.date}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecentEvents;
