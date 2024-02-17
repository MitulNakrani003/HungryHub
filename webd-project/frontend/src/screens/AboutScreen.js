import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "./CSS/AboutUs.css";

export default function AboutScreen() {
  return (
    <>
      <Card
        className="bg-white text-dark"
        style={{
          position: "relative",
          width: "90%",
          height: "40%",
          margin: "0 auto",
          border: "none",
        }}
      >
        <Card.Img
          className="pageBanner"
          src="./images/aboutUs.jpg"
          alt="Card image"
        />
        <Card.Title className="pageTitle">About Us</Card.Title>
      </Card>

      <div className="review" style={{ margin: "20px auto", width: "70%" }}>
        <p className="aboutPara">
          {" "}
          Hungry Hub delivery portal is a culinary delight that brings the world of diverse cuisines and beverages right to your doorstep, making dining an extraordinary experience. This exceptional platform seamlessly connects food enthusiasts with a myriad of delectable options, creating a symphony of flavors that caters to every palate.
        </p>
        <p className="aboutPara">
          {" "}
          One of the standout features of Hungry Hub is its extensive array of cuisines, ranging from the exotic flavors of Asian delicacies to the comforting familiarity of Western classics. Whether you crave the bold spices of Thai cuisine, the savory richness of Italian pasta, or the succulent goodness of a perfectly grilled burger, Hungry Hub has it all. The portal serves as a gateway to a global culinary journey, allowing users to explore and indulge in a diverse range of dishes without leaving the comfort of their homes.
        </p>
        <p className="aboutPara">
          {" "}
          The efficiency of Hungry Hub's delivery service is another feather in its cap. With a seamless and user-friendly interface, customers can easily navigate through a plethora of options, customize their orders, and track the delivery status in real-time. The commitment to timely deliveries ensures that the piping hot and meticulously prepared dishes reach your doorstep with the same freshness and quality as if you were dining in a top-notch restaurant.
        </p>
        <p className="aboutPara">
          {" "}
          Whether you're looking for a quick lunch or a leisurely dinner, HungryHub is the ultimate destination for a memorable and satisfying meal.
        </p>
        <br></br>
      </div>

      <div
        className="team"
        style={{ margin: "20px auto", width: "80%", alignContent: "center" }}
      >
        <p className="teamHeading"> Team </p>

 <CardGroup style={{margin:"20px 30px" }}>
  
  
  <Card>
  <Card.Img variant="top" className= "teamImg" src="./images/ankit.jpeg"  />
    <Card.Body className='teamBody'>
    <Card.Title className='teamName'>Ankit Lall</Card.Title>
    </Card.Body>
  </Card>
  <Card>
  <Card.Img variant="top" className= "teamImg" src="./images/shivani.jpg"   />
    <Card.Body className='teamBody'>
    <Card.Title className='teamName'> Shivani Datar</Card.Title>
    </Card.Body>
  </Card>
  <Card>
            <Card.Img
              variant="top"
              className="teamImg"
              src="./images/ashi.jpg"
            />
            <Card.Body className="teamBody">
              <Card.Title className="teamName">Ashi Tyagi</Card.Title>
            </Card.Body>
          </Card>
  <Card>
  <Card.Img variant="top" className= "teamImg" src="./images/Esha.jpg"   />
    <Card.Body className='teamBody'>
    <Card.Title className='teamName'  >Esha Patel</Card.Title>
    </Card.Body>
  </Card>
</CardGroup>

 </div>

   </>
  )
}
