const BlogSectionForm = ({ secNum }: {secNum: number}) => {
    return (<section className="bg-white p-8 border border-gray-300 rounded-lg my-8">
        <h2 className="text-2xl mb-8">Section {secNum}</h2>
        <div className="my-12">
            <p className="text-lg font-semibold mb-8">Section Title*</p>
            <input type="text" placeholder="Section Title" name={`sectionTitle${secNum}`} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 text-lg outline-none" />
        </div>
        <div className="my-12">
            <p className="text-lg font-semibold mb-8">Section Content</p>
            <textarea placeholder="Content" name={`sectionContent${secNum}`} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 text-lg outline-none" />
        </div>

        <div className="my-12">
            <p className="text-lg font-semibold mb-8">Section Image</p>
            <input type="file" name="file" />
        </div>
    </section>)
}


export default BlogSectionForm;