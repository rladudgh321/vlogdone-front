function FooterPage() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="text-center my-10">
      © {year}. hyeonju all rights reserved.
    </div>
  );
}

export default FooterPage;
