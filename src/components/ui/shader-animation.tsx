"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

type ShaderUniforms = {
  time: { value: number }
  resolution: { value: THREE.Vector2 }
}

type ShaderScene = {
  camera: THREE.Camera
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  uniforms: ShaderUniforms
  animationId: number
}

export function ShaderAnimation({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<ShaderScene | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*3.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }

        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms: ShaderUniforms = {
      time: { value: 48 },
      resolution: { value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      })
    } catch {
      geometry.dispose()
      material.dispose()
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.setClearColor(0x000000, 1)
    renderer.domElement.style.display = "block"
    container.appendChild(renderer.domElement)

    const onResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      if (width === 0 || height === 0) return
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
      renderer.setSize(width, height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    onResize()
    renderer.render(scene, camera)

    window.addEventListener("resize", onResize, false)
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const animate = () => {
      if (!sceneRef.current) return
      sceneRef.current.animationId = requestAnimationFrame(animate)
      if (document.hidden) return
      uniforms.time.value += 0.018
      renderer.render(scene, camera)
    }

    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    }

    if (reduceMotion) {
      renderer.render(scene, camera)
    } else {
      animate()
    }

    return () => {
      window.removeEventListener("resize", onResize)
      resizeObserver.disconnect()

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
        if (sceneRef.current.renderer.domElement.parentElement === container) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }
        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
        sceneRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className ?? "h-screen w-full"}
      aria-hidden="true"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  )
}
