import{r as u,j as e}from"./index-BHsWfW0j.js";import{S as B,U as I,a as _,M as E,R as U,e as b,u as m,_ as P,B as L,P as V,V as h,C as g,b as W,c as x,E as w,L as O}from"./Edges-BTkZy6nt.js";function N(o,r,s,i){var t;return t=class extends B{constructor(n){super({vertexShader:r,fragmentShader:s,...n});for(const a in o)this.uniforms[a]=new I(o[a]),Object.defineProperty(this,a,{get(){return this.uniforms[a].value},set(l){this.uniforms[a].value=l}});this.uniforms=_.clone(this.uniforms)}},t.key=E.generateUUID(),t}const H=()=>parseInt(U.replace(/\D+/g,"")),$=H(),q=N({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new g,sectionColor:new g,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new h,worldPlanePosition:new h},`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${$>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),J=u.forwardRef(({args:o,cellColor:r="#000000",sectionColor:s="#2080ff",cellSize:i=.5,sectionSize:t=1,followCamera:n=!1,infiniteGrid:a=!1,fadeDistance:l=100,fadeStrength:c=1,fadeFrom:f=1,cellThickness:p=.5,sectionThickness:M=1,side:C=L,...z},F)=>{b({GridMaterial:q});const d=u.useRef(null);u.useImperativeHandle(F,()=>d.current,[]);const j=new V,k=new h(0,1,0),S=new h(0,0,0);m(T=>{j.setFromNormalAndCoplanarPoint(k,S).applyMatrix4(d.current.matrixWorld);const y=d.current.material,D=y.uniforms.worldCamProjPosition,R=y.uniforms.worldPlanePosition;j.projectPoint(T.camera.position,D.value),R.value.set(0,0,0).applyMatrix4(d.current.matrixWorld)});const G={cellSize:i,sectionSize:t,cellColor:r,sectionColor:s,cellThickness:p,sectionThickness:M},A={fadeDistance:l,fadeStrength:c,fadeFrom:f,infiniteGrid:a,followCamera:n};return u.createElement("mesh",P({ref:d,frustumCulled:!1},z),u.createElement("gridMaterial",P({transparent:!0,"extensions-derivatives":!0,side:C},G,A)),u.createElement("planeGeometry",{args:o}))});function v(o){return()=>{o|=0,o=o+1831565813|0;let r=Math.imul(o^o>>>15,1|o);return r=r+Math.imul(r^r>>>7,61|r)^r,((r^r>>>14)>>>0)/4294967296}}function K({reduced:o,bias:r}){const{camera:s,pointer:i}=x(),t=u.useRef(0);return m((n,a)=>{if(o){s.position.set(r*.4,1.5,8.4),s.lookAt(r*.6,.1,0);return}t.current+=a;const l=Math.sin(t.current*.1)*.6;s.position.z+=(7.9-s.position.z)*.012,s.position.x+=(r*.4+l+i.x*.5-s.position.x)*.035,s.position.y+=(1.45+i.y*.32-s.position.y)*.035,s.lookAt(r*.62,.05,0)}),null}function Q({count:o,reduced:r}){const s=u.useRef(null),{positions:i,speeds:t}=u.useMemo(()=>{const n=v(7),a=new Float32Array(o*3),l=new Float32Array(o);for(let c=0;c<o;c++)a[c*3]=(n()-.5)*20,a[c*3+1]=-1.4+n()*8,a[c*3+2]=(n()-.5)*18-2,l[c]=.06+n()*.22;return{positions:a,speeds:l}},[o]);return m((n,a)=>{if(!s.current||r)return;const l=s.current.geometry.attributes.position,c=l.array;for(let f=0;f<o;f++)c[f*3+1]+=t[f]*a,c[f*3+1]>7&&(c[f*3+1]=-1.5);l.needsUpdate=!0,s.current.rotation.y=n.clock.elapsedTime*.008}),e.jsxs("points",{ref:s,children:[e.jsx("bufferGeometry",{children:e.jsx("bufferAttribute",{attach:"attributes-position",args:[i,3]})}),e.jsx("pointsMaterial",{color:"#FF4D5A",size:.045,sizeAttenuation:!0,transparent:!0,opacity:.55,depthWrite:!1})]})}function X({reduced:o,position:r}){const s=u.useRef(null),i=u.useRef(null),t=u.useRef(null),n=u.useRef(null);return m((a,l)=>{if(o)return;const c=a.clock.elapsedTime;if(s.current&&(s.current.rotation.y+=l*.28,s.current.rotation.x=Math.sin(c*.2)*.35),i.current){i.current.rotation.y-=l*.45;const f=1+Math.sin(c*2.2)*.07;i.current.scale.setScalar(f);const p=i.current.material;p.emissiveIntensity=1.7+Math.sin(c*2.2)*.55}t.current&&(t.current.rotation.z+=l*.25),n.current&&(n.current.rotation.z-=l*.18)}),e.jsxs("group",{position:r,children:[e.jsxs("mesh",{position:[0,-1.52,0],children:[e.jsx("cylinderGeometry",{args:[1.5,1.5,.08,48]}),e.jsx("meshStandardMaterial",{color:"#141414",roughness:.55,metalness:.45}),e.jsx(w,{color:"#7a4d00",threshold:20})]}),e.jsxs("mesh",{position:[0,-1.46,0],rotation:[-Math.PI/2,0,0],children:[e.jsx("torusGeometry",{args:[1.18,.012,8,72]}),e.jsx("meshBasicMaterial",{color:"#ff9800",transparent:!0,opacity:.5})]}),e.jsxs("mesh",{ref:s,children:[e.jsx("icosahedronGeometry",{args:[1.05,0]}),e.jsx("meshBasicMaterial",{color:"#FF4D5A",wireframe:!0,transparent:!0,opacity:.5})]}),e.jsxs("mesh",{ref:i,children:[e.jsx("octahedronGeometry",{args:[.42,0]}),e.jsx("meshStandardMaterial",{color:"#08090C",emissive:"#B92536",emissiveIntensity:1.8,roughness:.3,metalness:.4})]}),e.jsxs("mesh",{ref:t,rotation:[Math.PI/2.4,.4,0],children:[e.jsx("torusGeometry",{args:[1.75,.009,8,92]}),e.jsx("meshBasicMaterial",{color:"#FF4D5A",transparent:!0,opacity:.32})]}),e.jsxs("mesh",{ref:n,rotation:[Math.PI/1.7,-.5,.6],children:[e.jsx("torusGeometry",{args:[2.15,.007,8,92]}),e.jsx("meshBasicMaterial",{color:"#FF7A85",transparent:!0,opacity:.18})]})]})}function Y({low:o,reduced:r}){const s=u.useMemo(()=>{const t=v(21),n=[],a=o?9:15;for(let l=0;l<a;l++){const c=l/a*Math.PI*2+t()*.6,f=3.4+t()*3.4;n.push({x:Math.cos(c)*f,z:Math.sin(c)*f*.85-.4,w:.55+t()*1.2,h:.45+t()*2.3,d:.55+t()*1.2,wire:t()>.72,edged:t()>.45})}return n},[o]),i=u.useRef(null);return m(t=>{r||!i.current||(i.current.rotation.y=Math.sin(t.clock.elapsedTime*.05)*.04)}),e.jsx("group",{ref:i,position:[0,-1.6,0],children:s.map((t,n)=>e.jsxs("mesh",{position:[t.x,t.h/2,t.z],children:[e.jsx("boxGeometry",{args:[t.w,t.h,t.d]}),t.wire?e.jsx("meshBasicMaterial",{color:"#333330",wireframe:!0}):e.jsx("meshStandardMaterial",{color:"#161616",roughness:.8,metalness:.25}),t.edged&&!t.wire&&e.jsx(w,{color:"#8a5600",threshold:25})]},n))})}function Z({reduced:o}){const r=u.useRef([]),s=u.useMemo(()=>[[2.9,1.5,-1.8],[3.9,2.4,-.4],[3.1,3.1,1.3],[4.6,1.6,1.9]],[]);return m(i=>{o||r.current.forEach((t,n)=>{if(!t)return;const a=1+Math.sin(i.clock.elapsedTime*2+n*1.4)*.22;t.scale.setScalar(a)})}),e.jsxs("group",{children:[s.slice(0,-1).map((i,t)=>e.jsx(O,{points:[i,s[t+1]],color:"#ff9800",lineWidth:1,transparent:!0,opacity:.45,dashed:!0,dashSize:.15,gapSize:.1},t)),s.map((i,t)=>e.jsxs("mesh",{position:i,ref:n=>r.current[t]=n,children:[e.jsx("octahedronGeometry",{args:[.07,0]}),e.jsx("meshBasicMaterial",{color:"#FF7A85"})]},t))]})}function ee(){const o=x(r=>r.invalidate);return u.useEffect(()=>{o();const r=setTimeout(o,120);return()=>clearTimeout(r)},[o]),null}function se({reduced:o,low:r,frameloop:s}){return e.jsxs(W,{frameloop:s,dpr:r?[1,1.3]:[1,1.8],gl:{antialias:!r,powerPreference:"high-performance",alpha:!1},camera:{fov:42,near:.1,far:60,position:[0,1.6,11]},className:"!absolute !inset-0",children:[e.jsx("color",{attach:"background",args:["#08090C"]}),e.jsx("fog",{attach:"fog",args:["#08090C",10.5,27]}),e.jsx(ee,{}),e.jsx(te,{reduced:o,low:r})]})}function te({reduced:o,low:r}){const{size:s}=x(),i=s.width>=1280?1.9:s.width>=1024?1.5:s.width>=768?.8:0;return e.jsxs(e.Fragment,{children:[e.jsx(K,{reduced:o,bias:i}),e.jsx(J,{position:[0,-1.6,0],args:[44,44],cellSize:.62,cellThickness:.6,cellColor:"#1A1D26",sectionSize:3.1,sectionThickness:1,sectionColor:new g("#B92536"),fadeDistance:25,fadeStrength:2.2,infiniteGrid:!0}),e.jsxs("group",{position:[i,0,0],children:[e.jsx(X,{reduced:o,position:[0,.15,0]}),e.jsx(Y,{low:r,reduced:o}),e.jsx(Z,{reduced:o}),e.jsx(Q,{count:o?0:r?180:480,reduced:o})]}),e.jsx("ambientLight",{intensity:.22}),e.jsx("pointLight",{position:[i,.6,0],color:"#FF4D5A",intensity:9,distance:11,decay:2}),e.jsx("spotLight",{position:[i+6,9,4],angle:.55,penumbra:.9,intensity:90,distance:36,color:"#FF7A85"}),e.jsx("directionalLight",{position:[-7,5,-6],intensity:.7,color:"#C8CDD5"})]})}export{se as default};
