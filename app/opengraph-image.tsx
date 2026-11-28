
import { ImageResponse } from 'next/og';

export const alt =
  'Sacrament Meeting Planner — Plan and organize Sunday meeting programs';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '65px 75px',
          background:
            'linear-gradient(135deg, #0f172a 0%, #172554 55%, #1e40af 100%)',
          color: '#ffffff',
          fontFamily: 'Arial',
          position: 'relative',
        }}
      >
        {/* Decorative background circle */}
        <div
          style={{
            position: 'absolute',
            right: '-100px',
            top: '-180px',
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.12)',
            display: 'flex',
          }}
        />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: '#ffffff',
              color: '#1e40af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 800,
            }}
          >
            S
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '1px',
            }}
          >
            SACRAMENT MEETING PLANNER
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '45px',
          }}
        >
          {/* Left text section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '620px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '18px',
                fontWeight: 700,
                color: '#93c5fd',
                letterSpacing: '4px',
                marginBottom: '22px',
              }}
            >
              PLAN · ORGANIZE · SHARE
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: '66px',
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: '-2px',
              }}
            >
              <div style={{ display: 'flex' }}>Plan Sunday</div>
              <div style={{ display: 'flex' }}>Meetings with</div>
              <div style={{ display: 'flex' }}>Confidence.</div>
            </div>

            <div
              style={{
                display: 'flex',
                marginTop: '25px',
                fontSize: '23px',
                lineHeight: 1.5,
                color: '#cbd5e1',
              }}
            >
              Organize meaningful sacrament meeting programs with ease.
            </div>
          </div>

          {/* Sunday program preview card */}
          <div
            style={{
              width: '350px',
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: '22px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '15px',
                fontWeight: 700,
                color: '#2563eb',
                letterSpacing: '2px',
              }}
            >
              SUNDAY PROGRAM
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: '27px',
                fontWeight: 800,
                marginTop: '13px',
              }}
            >
              Sacrament Meeting
            </div>

            <div
              style={{
                height: '2px',
                background: '#e2e8f0',
                marginTop: '20px',
                marginBottom: '18px',
                display: 'flex',
              }}
            />

            {[
              ['01', 'Opening Hymn'],
              ['02', 'Invocation'],
              ['03', 'Sacrament'],
              ['04', 'Speakers'],
              ['05', 'Closing Hymn'],
            ].map(([number, label]) => (
              <div
                key={number}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '9px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  {number}
                </div>

                <div
                  style={{
                    display: 'flex',
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#334155',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '22px',
            fontSize: '17px',
            color: '#cbd5e1',
          }}
        >
          <div style={{ display: 'flex' }}>
            Organized programs. Meaningful worship.
          </div>

          <div style={{ display: 'flex' }}>
            Simple · Clear · Organized
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
