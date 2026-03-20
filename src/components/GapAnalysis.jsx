import { CORE_AREAS, REQUIREMENTS } from '../data/mtecRequirements';

export default function GapAnalysis({ analysis }) {
  const { core, skills, totalCP, thesis } = analysis;

  const allAreas = CORE_AREAS.map(area => ({
    ...area,
    covered: core.coveredAreas.includes(area.id),
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Gap Analysis</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Core Areas Coverage */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-3">Core Areas (need 5 of 6)</h4>
          <div className="space-y-2">
            {allAreas.map(area => (
              <div key={area.id} className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  area.covered
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-red-100 text-red-500'
                }`}>
                  {area.covered ? '\u2713' : '\u2717'}
                </span>
                <span className={`text-sm ${area.covered ? 'text-gray-700' : 'text-red-600 font-medium'}`}>
                  {area.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {core.coveredAreas.length}/5 areas covered
            {core.missingAreas > 0 && ` \u2014 ${core.missingAreas} more needed`}
          </p>
        </div>

        {/* Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-gray-700 mb-2">Requirements Summary</h4>

          <Requirement
            label="Total Credits"
            current={totalCP}
            target={REQUIREMENTS.totalCP}
            unit="CP"
          />
          <Requirement
            label="Core Credits"
            current={core.cp}
            target={REQUIREMENTS.coreMinCP}
            unit="CP"
          />
          <Requirement
            label="Skill Courses"
            current={skills.count}
            target={REQUIREMENTS.skillTrainingMin}
            unit="courses"
          />
          <Requirement
            label="Thesis"
            current={thesis.completed ? 12 : 0}
            target={REQUIREMENTS.thesisCP}
            unit="CP"
          />
        </div>
      </div>
    </div>
  );
}

function Requirement({ label, current, target, unit }) {
  const met = current >= target;
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm font-medium ${met ? 'text-emerald-600' : 'text-amber-600'}`}>
        {current}/{target} {unit} {met ? '\u2713' : `(${target - current} needed)`}
      </span>
    </div>
  );
}
