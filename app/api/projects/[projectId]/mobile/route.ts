import { NextRequest, NextResponse } from 'next/server';
import { buildMobileArtifacts } from '@/engine/publish/buildApp';
import { prisma } from '@/engine/store/prisma';
import path from 'path';

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const { platform } = await req.json(); // 'ios' | 'android' | 'both'

    const project = await prisma.project.findUnique({
      where: { id: params.projectId }
    });

    if (!project || project.status !== 'ready') {
      return NextResponse.json(
        { error: 'Project not ready for mobile build' },
        { status: 400 }
      );
    }

    const workspacePath = path.join(process.cwd(), 'workspaces', params.projectId);
    const mobileBuild = await buildMobileArtifacts(params.projectId, workspacePath);

    return NextResponse.json(mobileBuild);
  } catch (error) {
    return NextResponse.json(
      { error: 'Mobile build failed: ' + error.message },
      { status: 500 }
    );
  }
}