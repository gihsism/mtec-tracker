const SITE_URL = 'https://studiescheck.com';

// Smart bookmarklet: detects if on transcript or registrations page
const bookmarkletCode = `javascript:void(function(){
  var u=window.location.href;
  if(!u.includes('lehrbetrieb.ethz.ch/myStudies')){
    alert('Please navigate to a myStudies page first (transcript or registrations).');
    return;
  }
  var t=document.body.innerText;
  var e=btoa(unescape(encodeURIComponent(t)));
  if(u.includes('Belegung') || u.includes('belegung')){
    window.open('${SITE_URL}#enroll='+e,'_blank');
  } else {
    window.open('${SITE_URL}#import='+e,'_blank');
  }
})()`;

const bookmarkletHref = bookmarkletCode.replace(/\s+/g, ' ').trim();

export default function BookmarkletInstructions({ variant = 'transcript' }) {
  const isEnroll = variant === 'enroll';

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
        {/* Step 1: Bookmarklet */}
        <div className="flex gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span>
          <div>
            <p className="text-sm font-medium text-gray-800">Drag this button to your bookmarks bar</p>
            <div className="mt-2">
              <a
                href={bookmarkletHref}
                onClick={e => e.preventDefault()}
                draggable="true"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 cursor-grab active:cursor-grabbing"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Import to StudiesCheck
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Can't drag? Right-click &rarr; Bookmark this link. Or{' '}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(bookmarkletHref);
                  alert('Copied! Create a new bookmark and paste this as the URL.');
                }}
                className="text-blue-500 hover:underline"
              >
                copy the code
              </button>.
              {!isEnroll && ' Same bookmarklet works for both transcript and enrollments.'}
            </p>
          </div>
        </div>

        {/* Step 2: Navigate */}
        <div className="flex gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span>
          <div>
            <p className="text-sm font-medium text-gray-800">
              Go to your{' '}
              {isEnroll ? (
                <a
                  href="https://www.lehrbetrieb.ethz.ch/myStudies/studEinschreibenFaecher.view?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  myStudies registrations page
                </a>
              ) : (
                <a
                  href="https://www.lehrbetrieb.ethz.ch/myStudies/studLeistungsueberblick.view?clearRegId=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  myStudies transcript page
                </a>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Log in if needed.</p>
          </div>
        </div>

        {/* Step 3: Click */}
        <div className="flex gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span>
          <div>
            <p className="text-sm font-medium text-gray-800">Click the bookmarklet</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {isEnroll
                ? 'Your current registrations will be imported automatically.'
                : 'Your transcript will be imported automatically.'
              }
              {' '}No credentials are shared.
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        The bookmarklet only reads the page text from your browser. Your ETH login and credentials never leave your browser.
      </p>
    </div>
  );
}
