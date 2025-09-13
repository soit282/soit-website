import "./Section9.css";
import ArrowButton from "@components/common/ArrowButton";

export default function Section9() {
  const clients = [
    {
      id: 1,
      name: "OKKIO",
      logo: "/1_Homepage/1_Homepage/3_Clients/OKKIO_Logo.svg",
    },
    {
      id: 2,
      name: "Lêla",
      logo: "/1_Homepage/1_Homepage/3_Clients/Lêla_logo.svg",
    },
    {
      id: 3,
      name: "CTY",
      logo: "/1_Homepage/1_Homepage/3_Clients/CTY_logo.svg",
    },
    {
      id: 4,
      name: "TBros",
      logo: "/1_Homepage/1_Homepage/3_Clients/tra-made.svg",
    },
  ];

  return (
    <div className="section9">
      <div className="section9-see-all">
        <ArrowButton text="See all" />
      </div>

      <div className="section9-container">
        <div className="section9-header">
          <p className="section9-label text-4">Clients</p>
          <h2 className="section9-heading text-2">
            We collaborate with brands that aim to stand out, scale up, and
            speak clearly in a digital-first world.
          </h2>
        </div>
      </div>

      <div className="clients-grid">
        {clients.map((client) => (
          <div key={client.id} className="client-card">
            <div
              className="client-background"
              style={{
                backgroundImage: `url('/1_Homepage/1_Homepage/3_Clients/Background_1.png')`,
              }}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="client-logo"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
