import { useState } from 'react'
import './Faqs.css'
import { Link } from 'react-router-dom';

const FaqItem = ({ question, answer }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  }

  return (
    <div>
      <div className={`faq-item ${show ? "active" : ""}`}>
        <div className="faq-item-header" onClick={toggleShow}>
          {question}
        </div>
        <div className="faq-item-body">
          <div className="faq-item-body-content">
            {answer}
          </div>
        </div>
      </div>
    </div>
  )
}

const FaqAccordion = ({ data }) => {
  return (
    <div className="faq-container">
      <div className="faq-accordion">
      <h2 style={{ backgroundColor: '#312c60' , margin:'5px',padding:'8px' , paddingLeft:'40px'}}>FAQs</h2>
        {data.map((item) => <FaqItem key={item.id} question={item.question} answer={item.answer} />)}
      </div>
    </div>
  )
}

const data = [
  { id: 1, question: "How can I place an order on the EliteZ platform?", answer: "To place an order, simply browse through our product categories, select the items you wish to purchase, add them to your cart, and proceed to checkout. You will need to create an account or log in if you already have one." },
  { id: 2, question: "What payment methods are accepted on EliteZ?", answer: "EliteZ accepts credit/debit cards payment methods and cash on delivery (COD). You can choose your preferred payment method during the checkout process." },
  { id: 3, question: "How do I track my order status?", answer: "After placing an order, you can track its status by logging into your account and navigating to the Order History section. You will find detailed information about your order's current status and estimated delivery date." },
  { id: 4, question: "Can I cancel or modify my order after it has been placed?", answer: " Yes, you can cancel or modify your order as long as it has not yet been processed for shipment. To do so, please log in to your account, go to Order History and select the order you wish to cancel or modify." },
  { id: 5, question: " How long does it take for my order to be delivered?", answer: "Delivery times vary depending on your location and the shipping method selected. Typically, orders are delivered within 1-7 business days. You will receive an estimated delivery date at checkout and can track your order for updates." },
  { id: 6, question: "How can I contact customer support if I have any issues with my order?", answer: " If you have any issues or queries regarding your order, you can contact our customer support team via the Contact Us page on our website. We offer support through email and phone." },
  { id: 7, question: "Can I save products to a cart for future purchase?", answer: "Yes, you can save products to your cart by clicking the Add to Cart button on the product page. You can view and manage your cart by logging into your account." },
  { id: 8, question: "How do I know if a product is in stock?", answer: "Product availability is displayed on each product page." },
  { id: 9, question: "Can I schedule a specific delivery date and time for my order?", answer: "Currently, EliteZ does not offer the option to schedule specific delivery dates and times. However, we strive to deliver orders as quickly as possible and provide estimated delivery dates based on your location." },
  { id: 10, question: " How can I update my account information, such as my address or payment details?", answer: "To update your account information, log in to your EliteZ account and navigate to the Account Settings section. Here, you can update your personal details." }


]

export const Faqs = () => {
  return (
    <>
      <div className="homeHeader">

        <div className="homeHeaderLinks">
          <Link to="/" style={{fontSize:'150%'}}>Home</Link>
          <Link to="/products" style={{fontSize:'150%'}}>Products</Link>
          <Link to="/faqs"style={{fontSize:'150%'}}>FAQs</Link>
          <Link to="/Login"style={{fontSize:'150%'}}>Log in</Link>
        </div>
      </div>
      <div className="App">
        <FaqAccordion data={data} />
      </div>
    </>
  )
}
