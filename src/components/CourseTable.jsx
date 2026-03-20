export default function CourseTable({ courses, title }) {
  if (!courses.length) return null;

  return (
    <div>
      {title && <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-3 text-gray-600 font-medium">Course</th>
              <th className="text-left py-2 px-3 text-gray-600 font-medium">ID</th>
              <th className="text-center py-2 px-3 text-gray-600 font-medium">Grade</th>
              <th className="text-center py-2 px-3 text-gray-600 font-medium">CP</th>
              <th className="text-center py-2 px-3 text-gray-600 font-medium">Semester</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <tr key={i} className={`border-b border-gray-100 ${c.withdrawn ? 'opacity-50' : ''}`}>
                <td className="py-2 px-3 text-gray-800">{c.name}</td>
                <td className="py-2 px-3 text-gray-500 font-mono text-xs">{c.id}</td>
                <td className="py-2 px-3 text-center">
                  {c.withdrawn ? (
                    <span className="text-red-500 text-xs font-medium">Withdrawn</span>
                  ) : typeof c.grade === 'number' ? (
                    <span className={`font-semibold ${c.grade >= 4 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {c.grade}
                    </span>
                  ) : (
                    <span className="text-emerald-600 text-xs font-medium">Pass</span>
                  )}
                </td>
                <td className="py-2 px-3 text-center font-medium text-gray-700">{c.cp || '-'}</td>
                <td className="py-2 px-3 text-center text-gray-500 text-xs">{c.session}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
