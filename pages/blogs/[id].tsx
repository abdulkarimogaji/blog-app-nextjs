import Image from "next/image";

const BlogDetail = () => {
  return (
    <section className="navbar-offset">
      <div className="flex-center">
        <div className="relative md:w-3/4 w-4/5 h-64 md:h-96">
          <Image src="/cover_img.jpg" alt="cover_img" layout="fill" objectFit="cover" />
        </div>
      </div>
      {/* blog title */}
      <div className="text-center">
        <h1 className="md:text-5xl text-2xl text-center md:my-8 my-5 md:px-80 px-10 leading-relaxed">
          These Are The 10 Most Beautiful Blog Designs In The World
        </h1>
        <div className="flex-center mb-2">
          <div className="relative w-20 h-20">
            <Image
              src="/user_avatar.jpeg"
              alt="user_avatar"
              layout="fill"
              style={{ borderRadius: 999 }}
            />
          </div>
        </div>
        <div className="text-sm mb-4">
          BY JAYE HANNAH, UPDATED ON MAY 31, 2022
        </div>
        <div className="text-lg">13 Mins read</div>
      </div>

      {/* blog content */}
      <div className="flex-center">
        <div className="w-3/4 md:w-4/5">
          {/* Intro */}
          <section className="md:my-16 my-8 md:px-32 px-4 ">
            <h2></h2>
            <p className="md:text-xl text-base leading-relaxed">
              It’s no secret that blogs are the pillar of any successful company
              website. A frequently updated blog will drive traffic to the
              brand, guide users with targeted content, and act as a vital tool
              to engage with the broader community. <br />
              <br />
              Alongside being a low-cost marketing strategy with a lucrative
              payoff, blogs are also the perfect way to establish your brand
              identity and grow a loyal following. Creating engaging,
              information-rich content for your readers, however, is only half
              of the job: equally important is presenting the content in a
              visually stimulating way.
              <br />
              <br /> When it comes to blog design, there are a variety of
              different factors to look at—from font sizes and text width, to
              hierarchy and calls-to-action. Uninspiring blog design is a sure
              fire way to lose interest—or even customers. Are you a budding UI
              designer exasperated by boring blogs? We’ve rounded up ten blogs
              and online magazines that showcase the very best of creative
              editorial design. To help us on our way, I’ve enlisted the
              expertise of CareerFoundry’s resident UI designer Amy, who’ll be
              shedding light on why each blog has hit the nail on the head with
              their UI design. <br />
              Without further ado, let’s jump right in!
            </p>
            {/* timestamps */}
            <ol className="flex flex-col md:gap-6 gap-3 md:text-xl text-base md:my-8 my-4 md:pl-6 pl-3 timestamp-ol">
              <li>
                <a href="https://google.com">Six Two</a>
              </li>
              <li>
                <a href="#">Six Two</a>
              </li>
              <li>
                <a href="#">Annual Digest</a>
              </li>
              <li>
                <a href="#">Staxk Over Flow</a>
              </li>
              <li>
                <a href="#">Eat The Blocks</a>
              </li>
              <li>
                <a href="#">Vercel</a>
              </li>
              <li>
                <a href="#">Support Roach</a>
              </li>
            </ol>
            <div className="flex-center"></div>
          </section>

          {/* Body 1 */}
          <section className="md:my-16 my-8 md:px-32 px-4">
            <h2 className="md:text-5xl text-lg md:mb-8 mb-4">1. Six Two</h2>
            <p className="md:text-xl text-base leading-relaxed">
              Powered by the global youth travel brand Contiki, Six-Two boasts
              robust travel guides jam-packed with gorgeous imagery that
              instantly makes us want to pack our bags and set off for some
              serious.
              <br />
              <br />
              Six-two have taken the popular ‘tiling’ feature and put their own
              spin on it—mixing blog posts in with text, and playing around with
              image size. While they’ve got some interesting features going on,
              they’ve kept the color scheme fairly basic—mostly sticking to
              pastel colours with the occasional splash of dark pink. Six-two
              has managed to strike a perfect balance between fun and
              informative.
            </p>
            <div className="flex-center md:my-16 my-8">
              <div className="relative md:w-3/4 w-4/5 md:h-96 h-40">
                <Image
                  src="/example_blog_img.jpg"
                  alt="example"
                  layout="fill"
                />
              </div>
            </div>
          </section>
          {/* author details */}
          <div className="flex-center">
            <div className="rounded-lg bg-gray-200 md:w-2/3 container md:p-8 p-4 md:text-base text-sm flex md:gap-6 gap-3">
              <div className="flex-center">
                <div className="relative md:w-20 md:h-20 h-10 w-10">
                  <Image
                    src="/user_avatar.jpeg"
                    alt="user_avatar"
                    layout="fill"
                    style={{ borderRadius: 999 }}
                  />
                </div>
              </div>
              <div>
                <strong>Abdulkarim Ogaji</strong>
                <p>AbdulkarimOgaji</p>
                <br />
                <br />
                <p>
                  Jaye Hannah is a London native currently living in Berlin.
                  Having studied Cross-Cultural Communications at university,
                  she’s now CareerFoundry’s Editor and loves watching Netflix,
                  attending meet-ups and cooking in her spare time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
